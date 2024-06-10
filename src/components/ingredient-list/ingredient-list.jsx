import React from 'react'
import styles from './ingredient-list.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

const IngredientList = React.forwardRef(({ title, ingredients, countersValue }, ref) => {
  return (
    <div>
      <h3 ref={ref} className='text text_type_main-medium mb-6'>{title}</h3>
      <ul className={styles.ingredient__list}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            ingredient={ingredient}
            count={countersValue[ingredient._id] || 0}
          />
        ))}
      </ul>
    </div>
  )
});

IngredientList.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  countersValue: PropTypes.object.isRequired
};

export default IngredientList;
