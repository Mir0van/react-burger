import React from 'react'
import styles from './order-details.module.css'
import doneImage from '../../images/done.png'

export default function OrderDetails() {
  return (
    <div className={styles.container}>
      <p className={`${styles.identificator} text text_type_digits-large mb-8`}>034536</p>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
      <img className='mb-15' src={doneImage} width={120} height={120} alt="Done." />
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
