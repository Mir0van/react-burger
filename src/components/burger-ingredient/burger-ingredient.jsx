import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { addSelectedIngredient } from '../../services/ingredients/reducer';
import { openIngredientModal } from '../../services/modals/reducer';
import { nanoid } from '@reduxjs/toolkit';

// тест удалить
import { addBunToConstructor, addIngredientsToConstructor } from '../../services/constructor/reducer';
// ------------

export default function BurgerIngredient({ ingredient, count }) {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openIngredientModal())  
    dispatch(addSelectedIngredient(ingredient));

    // тест для dnd. удалить------
    if (ingredient.type === 'bun') {
      dispatch(addBunToConstructor(ingredient))
    } else {
      dispatch(addIngredientsToConstructor({
        ...ingredient,
        key: nanoid()
      }))
    }
    // -----------------
  }

  return (
    <li
      className={styles.item}
      onClick={handleOpenModal}
    >
      <div className={styles.card}>
        <div className={`${styles.image} mb-2`}>
          <img src={ingredient.image} width='240' height='120' alt={ingredient.name} />
        </div>
        <div className={`${styles.price} mb-2`}>
          <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`${styles.name} text text_type_main-default mb-6`}>{ingredient.name}</p>
        {Boolean(count > 0) && <Counter count={count} size="default" />}
      </div>
    </li>
  )
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]).isRequired,
};
