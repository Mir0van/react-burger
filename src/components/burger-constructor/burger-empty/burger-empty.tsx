import React from 'react';
import styles from './burger-empty.module.css'
import { useSelector } from '../../../services/store';

type TBurgerEmptyMainProps = {
  position?: 'top' | 'bottom';
}

export default function BurgerEmpty({ position }: TBurgerEmptyMainProps) {
  const { dragIngredientType } = useSelector((store) => store.ingredients);

  if (!position) {
    return (
      <div className={`
        ${styles.empty} 
        ${styles.empty_center} 
        ${dragIngredientType !== null && dragIngredientType !== 'bun' && styles.empty_hover}`
      }>
        <p className='text text_type_main-default'>Выберите ингредиент</p>
      </div>
    )
  }

  return (
    <div className={`
      ${styles.empty} 
      ${position === 'top' ? styles.empty_top : styles.empty_bottom} 
      ${dragIngredientType === 'bun' && styles.empty_hover}`
    }>
      <p className='text text_type_main-default'>Выберите булку</p>
    </div>
  );
}
