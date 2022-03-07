import classes from "./Logo.css";
import BurgerLogo from "../../assets/burger-logo.png";
const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={BurgerLogo} alt="myBurger" />
    </div>
  );
};

export default logo;
