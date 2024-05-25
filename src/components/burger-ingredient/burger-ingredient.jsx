import styles from './burger-ingredients.module.css'
import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerIngredient(props) {
  return (
    <li>
      <div className={styles.card}>
        <div className={`${styles.image} mb-2`}>
          <img src={props.image} width='240' height='120' alt={props.name} />
        </div>
        <div className={`${styles.price} mb-2`}>
          <p className='text text_type_digits-default mr-2'>{props.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`${styles.name} text text_type_main-default mb-6`}>{props.name}</p>
        <Counter count={1} size="default" />
      </div>
    </li>
  )
}
