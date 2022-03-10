import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
  console.log("send to burger", props.ingredients);
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We Hope it tests well!</h1>
      <div>
        <Burger style={{ width: "100%", margin: "auto" }} ingredients={props.ingredients}></Burger>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
}

export default checkoutSummary;