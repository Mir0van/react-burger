import React, { useMemo, useEffect } from 'react';
import styles from './feed-details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from '../../services/store';
import { TBurgerIngredient } from '../../utils/types';
import { getOrderByNumber } from '../../utils/burger-api';
import { setSingleOrder } from '../../services/order/reducer';
import { getStatus } from '../../utils/helpers';

export default function FeedDetails() {
  const { number } = useParams();
  const dispatch = useDispatch();
  const { ingredientsData } = useSelector(store => store.ingredients)
  let orderData = useSelector(state => {
    let order = state.feed.data?.orders.find((ordr) => ordr.number === Number(number))

    if (order) {
      return order;
    }

    order = state.feedProfile.data?.orders.find((ordr) => ordr.number === Number(number))

    if (order) {
      return order;
    }

    return state.order.order
  })

  useEffect(() => {
    if (!orderData) {
      getOrderByNumber(Number(number))
        .then(response => {
          if (response.success && response.orders.length > 0) {
            dispatch(setSingleOrder(response.orders[0]));
          }
        })
        .catch(err => {
          console.error('Ошибка загрузки заказа:', err);
        });
    }
  }, [dispatch, number, orderData]);

  const filtredIngredients = useMemo(() => {
    const ingredientCountMap: Record<string, { ingredient: TBurgerIngredient, count: number }> = {};
  
    orderData?.ingredients.forEach((ingredientId) => {
      const ingredient = ingredientsData.find((item) => item._id === ingredientId);
      if (!ingredient) return;

      if (!ingredientCountMap[ingredient._id]) {
        ingredientCountMap[ingredient._id] = { ingredient, count: 1 };
      } else {
        ingredientCountMap[ingredient._id].count += 1;
      }
    });
  
    return Object.values(ingredientCountMap);
  }, [ingredientsData, orderData?.ingredients]);

  const totalPrice = useMemo(() => (
    filtredIngredients.reduce((acc, { ingredient, count }) => acc + (ingredient.price * count), 0)
  ), [filtredIngredients]);

  if (!orderData) {
    return (
      <div className={styles['loader-wrapper']}>
        <p className={`text text_type_main-medium ${styles.loader}`}>Загрузка...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-medium mb-10 ${styles.center}`}>#{orderData?.number}</p>
      <p className='text text_type_main-medium mb-3'>{orderData?.name}</p>
      <p className={`text text_type_main-default mb-15 ${styles.accent}`}>{getStatus(orderData?.status ?? '')}</p>
      <p className='text text_type_main-medium mb-6'>Состав:</p>
      <ul className={styles.list}>
        {
          filtredIngredients?.map(({ingredient, count}) => (
            <li className={styles.item} key={ingredient._id}>
              <div className={styles['img-wrapper']}>
                <img src={ingredient.image_mobile} width='112' height='56' alt="" />
              </div>
              <p className='text text_type_main-default ml-4 mr-4'>{ingredient.name}</p>
              <div className={styles['item-price']}>
                <p className='text text_type_digits-default mr-2'>{count} x {ingredient.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))
        }
      </ul>
      <div className={styles['summary-wrapper']}>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(orderData?.createdAt ?? '')} />
        <div className={styles.price}>
          <p className='text text_type_digits-default'>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
