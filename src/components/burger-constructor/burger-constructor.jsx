import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo, useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {ingredientPropType} from '../../utils/prop-types';

export default function BurgerConstructor({ingredientsData}) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const { bun, ingredients } = useMemo(() => {
    console.log('перерасчет bun и ingredients в BurgerConstructor')
    return {
      bun: ingredientsData.find((item) => item.type === 'bun'),
      ingredients: ingredientsData.filter((item) => item.type !== 'bun'),
    };
  }, [ingredientsData]);

  const handlerOpenModal = () => setIsOrderModalOpen(true);
  const handlerCloseModal = () => setIsOrderModalOpen(false);

  return ingredientsData && Boolean(ingredientsData.length) && (
    <section className={styles.section}>
      <h2 className='visually-hidden'>Конструктор бургеров</h2>
      <div className={`${styles.burger_constructor} mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
        <div className={`${styles.burger_constructor_scroll} custom-scroll`}>
          {ingredients.slice(0, 5).map((item) => (
            <div className={styles.constructor_container} key={item._id}>
              <DragIcon type='primary' />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            </div>
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </div>

      <div className={`${styles.order_wrapper} mr-4`}>
        <div className={`${styles.currency_wrapper} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>610</p>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handlerOpenModal}>Оформить заказ</Button>
      </div>

      {isOrderModalOpen && (
        <Modal
          header={''}
          onClose={handlerCloseModal}
        >
          <OrderDetails/>
        </Modal>)
      }

    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientPropType).isRequired,
};