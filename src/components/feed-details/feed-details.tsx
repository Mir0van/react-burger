import React from 'react';
import styles from './feed-details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

export default function FeedDetails() {
  const mockDate = '2024-09-29T17:33:32.877Z'

  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-medium mb-10 ${styles.center}`}>#034533</p>
      <p className='text text_type_main-medium mb-3'>Black Hole Singularity острый бургер</p>
      <p className={`text text_type_main-default mb-15 ${styles.accent}`}>Выполнен</p>
      <p className='text text_type_main-medium mb-6'>Состав:</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles['img-wrapper']}>
            <img src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" width='112' height='56' alt="" />
          </div>
          <p className='text text_type_main-default ml-4 mr-4'>Филе Люминесцентного тетраодонтимформа scdsdffd</p>
          <div className={styles['item-price']}>
            <p className='text text_type_digits-default mr-2'>1 x 300</p>
            <CurrencyIcon type="primary" />
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles['img-wrapper']}>
            <img src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" width='112' height='56' alt="" />
          </div>
          <p className='text text_type_main-default ml-4 mr-4'>Соус традиционный галактический</p>
          <div className={styles['item-price']}>
            <p className='text text_type_digits-default mr-2'>1 x 30</p>
            <CurrencyIcon type="primary" />
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles['img-wrapper']}>
            <img src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" width='112' height='56' alt="" />
          </div>
          <p className='text text_type_main-default ml-4 mr-4'>Соус традиционный галактический</p>
          <div className={styles['item-price']}>
            <p className='text text_type_digits-default mr-2'>2 x 60</p>
            <CurrencyIcon type="primary" />
          </div>
        </li>
      </ul>
      <div className={styles['summary-wrapper']}>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(mockDate)} />
        <div className={styles.price}>
          <p className='text text_type_digits-default'>480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
