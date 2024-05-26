import React from 'react'
import styles from './ingredient-list.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';

export default function IngredientList({ title, ingredients, handleOpenModal }) {
  return (
    <div>
      <h3 className='text text_type_main-medium mb-6'>{title}</h3>
      <ul className={styles.ingredient__list}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            handleOpenModal={handleOpenModal}
            ingredient={ingredient}
          />
        ))}
      </ul>
    </div>
  )
};

IngredientList.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number.isRequired
  })).isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};
