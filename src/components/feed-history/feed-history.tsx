import React from 'react'
import styles from './feed-history.module.css'
import OrderFeed from '../order-feed/order-feed'

export default function FeedHistory() {
  return (
    <div className={styles.wrapper}>
      <OrderFeed/>
      <OrderFeed/>
      <OrderFeed/>
      <OrderFeed/>
      <OrderFeed/>
    </div>
  )
}
