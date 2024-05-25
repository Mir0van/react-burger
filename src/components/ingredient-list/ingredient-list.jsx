import React from 'react'
import styles from './ingredient-list.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

export default function IngredientList({ title, ingredients }) {
  return (
    <div>
      <h3 className='text text_type_main-medium mb-6'>{title}</h3>
      <ul className={styles.ingredient__list}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            {...ingredient}
          />
        ))}
      </ul>
    </div>
  )
};
