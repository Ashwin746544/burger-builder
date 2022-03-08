import { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // alert("You Continued!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });

  };
  componentDidMount() {
    axios.get("https://react-my-burger-9228a-default-rtdb.firebaseio.com/ingredients.json").
      then(response => {
        this.setState({ ingredients: response.data });
      }).catch(error => { this.setState({ error: true }) });
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad: true,cheese: false,...}

    let orderSummery = null;

    let burger = this.state.error ? <p>ingredients can't loaded!</p> : <Spinner></Spinner>;
    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients}></Burger>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          ></BuildControls>
        </Auxiliary>
      );
      orderSummery = <OrderSummery
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        purchaseContinued={this.purchaseContinueHandler}
        purchaseCancelled={this.purchaseCancelHandler}
      ></OrderSummery>;
    }
    if (this.state.loading) {
      orderSummery = <Spinner></Spinner>;
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummery}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
