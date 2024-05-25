import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor({ingredientsData}) {
  // временно захадкорженные данные
  const fillings = ingredientsData.filter(item => item.type === 'main').slice(0, 5);
  // console.log(fillings, 'fillings')

  return (
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
          {
            fillings.map((item) => (
              <div className={styles.constructor_container} key={item._id}>
                <DragIcon type='primary'/>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </div>
            ))
          }
        </div>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredientsData[0].name} (низ)`}
          price={ingredientsData[0].price}
          thumbnail={ingredientsData[0].image_mobile}
        />
      </div>

      <div style={{display: 'flex', justifyContent: 'end'}} className='mr-4'>
        <div style={{display: 'flex', alignItems: 'center'}} className='mr-10'>
          <p className='text text_type_digits-medium mr-2'>610</p>
          <CurrencyIcon/>
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
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
  })).isRequired
};