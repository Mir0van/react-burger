import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed.module.css';
import OrderFeed from '../../components/order-feed/order-feed';

export default function Feed() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>
        <div className={styles.wrapper}>
          <div className={styles['feed-wrapper']}>
            <OrderFeed />
            <OrderFeed />
          </div>
          <div className={styles['summary-wrapper']}>
            <div className={styles['orders-wrapper']}>
              <div className={styles['status-wrapper']}>
                <p className='text text_type_main-medium mb-6'>Готовы:</p>
                <div className={styles.orders}>
                  <ul className={styles.list}>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                  </ul>
                  <ul className={styles.list}>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                  </ul>
                </div>
              </div>
              <div className={styles['status-wrapper']}>
                <p className='text text_type_main-medium mb-6'>В работе:</p>
                <div className={styles.orders}>
                  <ul className={styles.list}>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                  </ul>
                  <ul className={styles.list}>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034533</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles['sum-wrapper']}>
              <p className='text text_type_main-medium'>Выполнено за все время:</p>
              <p className='text text_type_digits-large'>28 752</p>
            </div>
            <div className={styles['sum-wrapper']}>
              <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
              <p className='text text_type_digits-large text-neon'>138</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
