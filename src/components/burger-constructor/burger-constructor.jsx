// import PropTypes from 'prop-types';
// import { ingredientPropType } from '../../utils/prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { closeOrderModal, openOrderModal } from '../../services/modals/reducer';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import { clearIngredientsConstructor } from '../../services/constructor/reducer';

export default function BurgerConstructor() {
  const {isOrderModalOpen} = useSelector(store => store.modals)
  const {ingredientsData} = useSelector(store => store.ingredients)
  const {bun, ingredients} = useSelector(store => store.burgerConstructor)
  const dispatch = useDispatch();

  // const { bunMock, ingredientsMock } = useMemo(() => {
  //   console.log('перерасчет bun и ingredients в BurgerConstructor')
  //   return {
  //     bun: ingredientsData.find((item) => item.type === 'bun'),
  //     ingredients: ingredientsData.filter((item) => item.type !== 'bun'),
  //   };
  // }, [ingredientsData]);

  const handleOpenModal = () => dispatch(openOrderModal());
  const handleCloseModal = () => {
    dispatch(closeOrderModal());
    dispatch(clearIngredientsConstructor())
  };

  const totalPrice = useMemo(() => {
    let bunsPrice = 0;
    if (bun) {
      bunsPrice = bun.price * 2;
    }

    const ingredientsPrice = ingredients.reduce((acc, item) => acc + item.price, 0)

    return bunsPrice + ingredientsPrice
  }, [bun, ingredients])

  return ingredientsData && Boolean(ingredientsData.length) && (
    <section className={styles.section}>
      <h2 className='visually-hidden'>Конструктор бургеров</h2>
      <div className={`${styles.burger_constructor} mb-10`}>
        {bun && <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />}
        <div className={`${styles.burger_constructor_scroll} custom-scroll`}>
          {ingredients.map((item) => (
            <div className={styles.constructor_container} key={item.key}>
              <DragIcon type='primary' />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            </div>
          ))}
        </div>
        {bun && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />}
      </div>

      <div className={`${styles.order_wrapper} mr-4`}>
        <div className={`${styles.currency_wrapper} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
      </div>

      {isOrderModalOpen && (
        <Modal
          header={''}
          onClose={handleCloseModal}
        >
          <OrderDetails />
        </Modal>)
      }

    </section>
  )
}

// BurgerConstructor.propTypes = {
  // ingredientsData: PropTypes.arrayOf(ingredientPropType).isRequired,
// };