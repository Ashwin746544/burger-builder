import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.css';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])]
        .map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    }
    ).reduce((flatArray, el) => { return flatArray.concat(el) }, []); //we make flatArray so we can check length ==0 or not
  console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start Adding Ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
}
export default burger;