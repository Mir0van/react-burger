import styles from './burger-ingredients.module.css'
import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function BurgerIngredient({ ingredient, handleOpenModal }) {
  // console.log(ingredient, 'props.ingredient')
  return (
    <li style={{cursor: 'pointer'}} onClick={() => {handleOpenModal('ingredientDetails', ingredient)}}>
      <div className={styles.card}>
        <div className={`${styles.image} mb-2`}>
          <img src={ingredient.image} width='240' height='120' alt={ingredient.name} />
        </div>
        <div className={`${styles.price} mb-2`}>
          <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`${styles.name} text text_type_main-default mb-6`}>{ingredient.name}</p>
        {/* временно захардорженый Counter */}
        <Counter count={1} size="default" />
      </div>
    </li>
  )
}

BurgerIngredient.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number.isRequired
  }).isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};
