import React from 'react'
import styles from './order-feed.module.css'
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from 'react-router-dom';

export default function OrderFeed(): React.JSX.Element {
  const location = useLocation();
  const mockDate = '2024-09-29T17:33:32.877Z'

  return (
    <Link className={styles.wrapper} to={'feedMock'} state={{ background: location }}>
      <div className={styles.header}>
        <p className='text text_type_digits-default'>#034535</p>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(mockDate)} />
      </div>
      <p className='text text_type_main-medium'>Death Star Starship Main бургер</p>
      <div className={styles.ingredients}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <img className={styles.img} src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" width='112' height='56' alt="" />
          </li>
          <li className={styles.item}>
            <img className={styles.img} src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" width='112' height='56' alt="" />
          </li>
          <li className={styles.item}>
            <img className={styles.img} src="https://code.s3.yandex.net/react/code/mineral_rings-mobile.png" width='112' height='56' alt="" />
          </li>
          <li className={styles.item}>
            <img className={styles.img} src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" width='112' height='56' alt="" />
          </li>
          <li className={styles.item}>
            <img className={styles.img} src="https://code.s3.yandex.net/react/code/mineral_rings-mobile.png" width='112' height='56' alt="" />
          </li>
          <li className={`${styles.item} ${styles['item--extra']}`}>
            <p className={`text text_type_main-default ${styles.count}`}>+3</p>
            <img className={styles.img} src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" width='112' height='56' alt="" />
          </li>
        </ul>
        <div className={styles.price}>
          <p className='text text_type_digits-default'>480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}
