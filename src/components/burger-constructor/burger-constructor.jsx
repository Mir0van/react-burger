import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

export default function BurgerConstructor({ 
    ingredientsData, 
    isModalRendered, 
    setIsModalRendered,
    visible,
    handleOpenModal,
    handleCloseModal
  }) {
  const [fillings, setFillings] = useState(null)

  useEffect(() => {
    if (ingredientsData) {
      // временно захадкорженные данные
      const fillingsData = ingredientsData.filter(item => item.type === 'main').slice(0, 5);
      setFillings(fillingsData);
    }
  }, [ingredientsData]);
  // console.log(fillings, 'fillings')

  return ingredientsData && fillings && (
    <section className={styles.section}>
      <h2 className='visually-hidden'>Конструктор бургеров</h2>
      <div className={`${styles.burger_constructor} mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredientsData[0].name} (верх)`}
          price={ingredientsData[0].price}
          thumbnail={ingredientsData[0].image_mobile}
        />
        <div className={`${styles.burger_constructor_scroll} custom-scroll`}>
          {fillings.map((item) => (
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
          text={`${ingredientsData[0].name} (низ)`}
          price={ingredientsData[0].price}
          thumbnail={ingredientsData[0].image_mobile}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'end' }} className='mr-4'>
        <div style={{ display: 'flex', alignItems: 'center' }} className='mr-10'>
          <p className='text text_type_digits-medium mr-2'>610</p>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => handleOpenModal('orderDetails')}>Оформить заказ</Button>
      </div>

      {visible === 'orderDetails' &&
        <Modal
          header={''}
          onCloseClick={handleCloseModal}
          setIsModalRendered={setIsModalRendered}
          isModalRendered={isModalRendered}
        >
          <OrderDetails/>
        </Modal>
      }

    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  })),
  isModalRendered: PropTypes.bool.isRequired,
  visible: PropTypes.string.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};