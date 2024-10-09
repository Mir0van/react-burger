import React, { useEffect } from 'react'
import styles from './feed-history.module.css'
import OrderFeed from '../order-feed/order-feed'
import { wsOrdersProfileConnect, wsOrdersProfileDisconnect } from '../../services/feed-profile/actions';
import { useDispatch, useSelector } from '../../services/store';
import { getWebsocketProfileStatus, getWsProfileOrders } from '../../services/feed-profile/reducer';
import { WebsocketStatus } from '../../utils/types';

export default function FeedHistory() {
  const dispatch = useDispatch();
  const feedProfileData = useSelector(getWsProfileOrders);
  const status = useSelector(getWebsocketProfileStatus)

  const params = localStorage.getItem('accessToken')?.replace("Bearer ", "");
  const PROFILE_ORDERS_SERVER_URL = `wss://norma.nomoreparties.space/orders?token=${params}`;

  useEffect(() => {
    dispatch(wsOrdersProfileConnect(PROFILE_ORDERS_SERVER_URL));

    return () => {
      dispatch(wsOrdersProfileDisconnect());
    };
  }, [PROFILE_ORDERS_SERVER_URL, dispatch]);

  if (status !== WebsocketStatus.ONLINE) {
    return <h2 className='text text_type_main-large mb-5'>Загрузка...</h2>
  }

  return (
    <div className={styles.wrapper}>
      {
        feedProfileData?.orders.slice().reverse().map((order) => (
          <OrderFeed order={order} key={order._id} status={true}/>
        ))
      }
    </div>
  )
}
