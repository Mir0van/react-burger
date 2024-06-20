import React from 'react'
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { addDragIngredient, deleteDragIngredient } from '../../services/ingredients/reducer';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';

export default function BurgerIngredient({ ingredient, count }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: ingredient.type,
    item: () => {
      console.log('Начали перетаскивать элемент:', ingredient.type);
      dispatch(addDragIngredient(ingredient.type))
      return { ingredient }
    },
    end: (item) => {
      console.log('Элемент сброшен:', item.ingredient.type);
      dispatch(deleteDragIngredient())
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  });

  // console.log(isDrag, 'isDrag')

  return (
    <li className={styles.item} ref={dragRef}>
      <Link 
        className={styles.link}
        to={`/ingredients/${ingredient._id}`}
        state={{background: location}}
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
      </Link>
    </li>
  )
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
  count: PropTypes.number.isRequired,
};
