import { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummery extends Component {
  // these could be a functional component ,here we used class to only check how this component will rerender
  componentWillUpdate() {
    console.log("[OrderSummery] componentWillUpdate");
  }
  render() {
    const ingredientSummery = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients!</p>
        <ul>{ingredientSummery}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
  }
}

export default OrderSummery;
