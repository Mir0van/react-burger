import styles from './burger-ingredients.module.css'
import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { INGREDIENT_MODAL_OPEN, setModalVisibility } from '../../services/modals/actions';
import { ADD_SELECTED_INGREDIENT } from '../../services/ingredients/actions';

export default function BurgerIngredient({ ingredient }) {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setModalVisibility(INGREDIENT_MODAL_OPEN, true))
    
    dispatch({
      type: ADD_SELECTED_INGREDIENT,
      payload: ingredient
    })
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
        {/* временно захардорженый Counter */}
        <Counter count={1} size="default" />
      </div>
    </li>
  )
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
  // setIsIngredientModalOpen: PropTypes.func.isRequired,
  // setSelectedIngredient: PropTypes.func.isRequired,
};
