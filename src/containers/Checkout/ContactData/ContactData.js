import Button from '../../../components/UI/Button/Button';
import { Component } from 'react';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }
  orderHandler = (event) => {
    console.log(this.props.ingredients);
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Ashwin chaudhary',
        address: {
          street: "Teststreet 1",
          pincode: 46734,
          country: "Germany"
        },
        email: "test123@.gmail.com"
      },
      deliveryMethod: "fastest"
    };

    axios.post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
  render() {
    let form = (<form>
      <input className={classes.Input} type="text" name="name" placeholder="Enter Name" />
      <input className={classes.Input} type="email" name="email" placeholder="Enter Email" />
      <input className={classes.Input} type="text" name="name" placeholder="Enter Street" />
      <input className={classes.Input} type="text" name="postalCode" placeholder="Enter PostalCode" />
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>);
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (<div className={classes.ContactData}>
      <h3>Enter Your Contact Data</h3>
      {form}
    </div>);
  }
}

export default ContactData;