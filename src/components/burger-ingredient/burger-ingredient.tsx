import React from 'react'
import styles from './burger-ingredients.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/store';
import { addDragIngredient, deleteDragIngredient } from '../../services/ingredients/reducer';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import { TBurgerIngredient } from '../../utils/types';

type TBurgerIngredientProps = {
  ingredient: TBurgerIngredient;
  count: number;
}

export default function BurgerIngredient({ ingredient, count }: TBurgerIngredientProps): React.JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  // isDrag оставил себе как подсказку для примера.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <li className={styles.item} ref={dragRef} data-testid='drag-item'>
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
            <CurrencyIcon type='primary' />
          </div>
          <p className={`${styles.name} text text_type_main-default mb-6`}>{ingredient.name}</p>
          {Boolean(count > 0) && <Counter count={count} size="default" />}
        </div>
      </Link>
    </li>
  )
}
