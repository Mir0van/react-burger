import React, { useMemo } from 'react'
import styles from './order-feed.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { TFeedOrder } from '../../utils/types';
import { useSelector } from '../../services/store';
import { getStatus } from '../../utils/helpers';

type TFeedOrderFeedProps = {
  order: TFeedOrder;
  status?: boolean;
}

export default function OrderFeed({ order, status }: TFeedOrderFeedProps): React.JSX.Element {
  const location = useLocation();
  const { ingredientsData } = useSelector(store => store.ingredients)
  const { name, createdAt, number, ingredients } = order;

  const filtredIngredients = useMemo(() => (
    ingredients
      .map((ingredientId) => ingredientsData.find((item) => item._id === ingredientId))
      .filter(Boolean) //отчистка если есть ложные элементы массива (null, undefined, 0, false, '')
  ),
    [ingredients, ingredientsData]
  );

  const ingredientImages = useMemo(() => (
    filtredIngredients
      .map((item) => item!.image_mobile)
  ),
    [filtredIngredients]
  );

  const totalPrice = useMemo(() => (
    filtredIngredients
      .reduce((acc, item) => acc + item!.price, 0)
  ),
    [filtredIngredients]
  )

  return (
    <Link className={styles.wrapper} to={number.toString()} state={{ background: location }}>
      <div className={styles.header}>
        <p className='text text_type_digits-default'>#{number}</p>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdAt)} />
      </div>
      <p className='text text_type_main-medium'>{name}</p>
      {status && <p className={`text text_type_main-default mb-4 ${order.status === 'done' ? styles.done : ''}`}>{getStatus(order.status)}</p>}
      <div className={styles.ingredients}>
        <ul className={styles.list}>
          {ingredientImages.slice(0, 5).map((image, index) => (
            <li className={styles.item} key={index}>
              <img className={styles.img} src={image} width='112' height='56' alt='' />
            </li>
          ))}
          {ingredientImages.length > 5 && (
            <li className={`${styles.item} ${styles['item--extra']}`}>
              {ingredientImages.length - 6 && <p className={`text text_type_main-default ${styles.count}`}>+{ingredientImages.length - 6}</p>}
              <img className={styles.img} src={ingredientImages[5]} width='112' height='56' alt='' />
            </li>
          )}
        </ul>
        <div className={styles.price}>
          <p className='text text_type_digits-default'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  )
}
