import React from 'react'
import styles from './ingredient-list.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

export default function IngredientList({ title, ingredients, setIsIngredientModalOpen, setSelectedIngredient }) {
  return (
    <div>
      <h3 className='text text_type_main-medium mb-6'>{title}</h3>
      <ul className={styles.ingredient__list}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            ingredient={ingredient}
            setIsIngredientModalOpen={setIsIngredientModalOpen}
            setSelectedIngredient={setSelectedIngredient}
          />
        ))}
      </ul>
    </div>
  )
};

IngredientList.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  setIsIngredientModalOpen: PropTypes.func.isRequired,
  setSelectedIngredient: PropTypes.func.isRequired,
};
