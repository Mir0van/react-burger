import styles from './burger-constructor.module.css';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeOrderModal } from '../../services/modals/reducer';
import { addBunToConstructor, addIngredientsToConstructor, clearIngredientsConstructor, deleteIngredientFromConstructor, moveIngredientCard } from '../../services/constructor/reducer';
import { postOrder } from '../../services/order/actions'; 
import { useDrop } from 'react-dnd';
import { nanoid } from '@reduxjs/toolkit';

export default function BurgerConstructor() {
  const {isOrderModalOpen} = useSelector(store => store.modals)
  const {ingredientsData} = useSelector(store => store.ingredients)
  const {bun, ingredients} = useSelector(store => store.burgerConstructor)
  const dispatch = useDispatch();

  const [{isOver}, dropRef] = useDrop({
    // isOver пока оставлю, что бы не забыть про него
    accept: ['bun', 'sauce', 'main'],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(dropIngridient) {
      // console.log(dropIngridient.ingredient, 'dropIngridient')

      if (dropIngridient.ingredient.type === 'bun') {
        dispatch(addBunToConstructor(dropIngridient.ingredient))
      } else {
        dispatch(addIngredientsToConstructor({
          ...dropIngridient.ingredient,
          key: nanoid()
        }))
      }
    }
  })

  // console.log(isOver, 'isOver')
  // console.log(ingredientIds, 'ingredientIds')
  // console.log(ingredients.length, 'ingredients BurgerConstructor')
  // console.log(bun, 'bun BurgerConstructor')

  const handlePostOrder = () => {
    const ingredientIds = ingredients.map((item) => item._id);
    if (bun) {
      ingredientIds.push(bun._id);
      ingredientIds.push(bun._id);
    }

    dispatch(postOrder(ingredientIds))
  };

  const handleCloseModal = () => {
    dispatch(closeOrderModal());
    dispatch(clearIngredientsConstructor())
  };

  const handleDeleteIngredient = useCallback((key) => {
    dispatch(deleteIngredientFromConstructor(key));
  }, [dispatch]);

  const totalPrice = useMemo(() => {
    let bunsPrice = 0;
    if (bun) {
      bunsPrice = bun.price * 2;
    }

    const ingredientsPrice = ingredients.reduce((acc, item) => acc + item.price, 0)

    return bunsPrice + ingredientsPrice
  }, [bun, ingredients])

  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    const newIngredients = [...ingredients]
    const dragIngredient = ingredients[dragIndex]
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragIngredient);
    // сокращенный варик
    // newIngredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0]);

    dispatch(moveIngredientCard(newIngredients))
  }, [dispatch, ingredients]);

  return ingredientsData && Boolean(ingredientsData.length) && (
    <section className={styles.section}>
      <h2 className='visually-hidden'>Конструктор бургеров</h2>
      <div className={`${styles.burger_constructor} mb-10`} ref={dropRef}>
        <BurgerConstructorElement
          dragIcon={false}
          type='top'
          ingredient={bun}
        />
        <div className={`${styles.burger_constructor_scroll} custom-scroll`}>
          {ingredients.length === 0 ? 
            (<BurgerConstructorElement
              dragIcon={false}
              type='primary'
              ingredient={null}
            />) : (
            ingredients.map((ingredientItem, index) => (
              <BurgerConstructorElement
                key={ingredientItem.key}
                dragIcon={true}
                type="primary"
                ingredient={ingredientItem}
                handleClose={() => handleDeleteIngredient(ingredientItem.key)}
                index={index}
                moveIngredient={moveIngredient}
              />
            ))
          )}
        </div>
        <BurgerConstructorElement
          dragIcon={false}
          type='bottom'
          ingredient={bun}
        />
      </div>

      <div className={`${styles.order_wrapper} mr-4`}>
        <div className={`${styles.currency_wrapper} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon />
        </div>
        <Button disabled={!ingredients.length || !bun} htmlType="button" type="primary" size="large" onClick={handlePostOrder}>Оформить заказ</Button>
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
