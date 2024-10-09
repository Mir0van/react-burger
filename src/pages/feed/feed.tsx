import styles from './feed.module.css';
import OrderFeed from '../../components/order-feed/order-feed';
import { useDispatch, useSelector } from '../../services/store';
import { getWebsocketStatus, getWsOrders } from '../../services/feed/reducer';
import { OrderStatus, WebsocketStatus } from '../../utils/types';
import { wsOrdersConnect, wsOrdersDisconnect } from '../../services/feed/actions';
import { useEffect, useMemo } from 'react';
import { formattedNumber } from '../../utils/helpers';

export default function Feed() {
  const dispatch = useDispatch();;
  const feedData = useSelector(getWsOrders);
  const status = useSelector(getWebsocketStatus);

  const ORDERS_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all';

  useEffect(() => {
    dispatch(wsOrdersConnect(ORDERS_SERVER_URL));

    return () => {
      dispatch(wsOrdersDisconnect());
    };
  }, [dispatch]);

  const doneOrders = useMemo(() => (
    feedData?.orders
      .filter((order) => order.status === OrderStatus.DONE)
      .slice(0, 10)
  ), [feedData?.orders]);

  const pendingOrders = useMemo(() => (
    feedData?.orders
      .filter((order) => order.status !== OrderStatus.DONE)
      .slice(0, 10)
  ), [feedData?.orders]);

  if (status !== WebsocketStatus.ONLINE) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className='text text_type_main-large mb-5'>Загрузка...</h2>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>
        <div className={styles.wrapper}>
          <div className={styles['feed-wrapper']}>
            {
              feedData?.orders.map((order) => (
                <OrderFeed order={order} key={order._id} />
              ))
            }
          </div>
          <div className={styles['summary-wrapper']}>
            <div className={styles['orders-wrapper']}>
              <div className={styles['status-wrapper']}>
                <p className='text text_type_main-medium mb-6'>Готовы:</p>
                <div className={styles.orders}>
                  <ul className={styles.list}>
                    {
                      doneOrders?.map((order, index) => (
                        index < 5 ? (
                          <li className='text text_type_digits-default' key={order.number}>{order.number}</li>
                        ) : null
                      ))
                    }
                  </ul>
                  <ul className={styles.list}>
                    {
                      doneOrders?.map((order, index) => (
                        index >= 5 ? (
                          <li className='text text_type_digits-default' key={order.number}>{order.number}</li>
                        ) : null
                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className={styles['status-wrapper']}>
                <p className='text text_type_main-medium mb-6'>В работе:</p>
                <div className={styles.orders}>
                  <ul className={styles.list}>
                    {
                      pendingOrders?.map((order, index) => (
                        index < 5 ? (
                          <li className='text text_type_digits-default' key={order.number}>{order.number}</li>
                        ) : null
                      ))
                    }
                  </ul>
                  <ul className={styles.list}>
                    {
                      pendingOrders?.map((order, index) => (
                        index >= 5 ? (
                          <li className='text text_type_digits-default' key={order.number}>{order.number}</li>
                        ) : null
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles['sum-wrapper']}>
              <p className='text text_type_main-medium'>Выполнено за все время:</p>
              <p className='text text_type_digits-large'>{formattedNumber(feedData?.total ?? 0)}</p>
            </div>
            <div className={styles['sum-wrapper']}>
              <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
              <p className='text text_type_digits-large text-neon'>{feedData?.totalToday ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
