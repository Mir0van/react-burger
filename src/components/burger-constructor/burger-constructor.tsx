import styles from './burger-constructor.module.css';
import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { closeOrderModal } from '../../services/modals/reducer';
import { addBunToConstructor, addIngredientsToConstructor, clearIngredientsConstructor, deleteIngredientFromConstructor, moveIngredientCard } from '../../services/constructor/reducer';
import { postOrder } from '../../services/order/actions';
import { useDrop } from 'react-dnd';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/loader';
import { TDragIngredient } from '../../utils/types';
import BurgerEmpty from './burger-empty/burger-empty';

type TDragObject = {
  ingredient: TDragIngredient
}

export default function BurgerConstructor() {
  const { isOrderModalOpen, isLoaderModalOpen } = useSelector(store => store.modals)
  const { ingredientsData } = useSelector(store => store.ingredients)
  const { bun, ingredients } = useSelector(store => store.burgerConstructor)
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ isOver }, dropRef] = useDrop<TDragObject, unknown, { isOver: boolean }>({
    // isOver пока оставлю, что бы не забыть про него
    accept: ['bun', 'sauce', 'main'],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(dropIngridient) {
      console.log(dropIngridient, 'dropIngridient')

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
    if (!user) {
      navigate('/login');
      return
    }

    const ingredientIds = ingredients.map((item: Pick<TDragIngredient, '_id'>) => item._id);
    if (bun) {
      ingredientIds.push(bun._id);
      ingredientIds.push(bun._id);
    }

    dispatch(postOrder(ingredientIds))
  };

  const handleCloseModal = () => {
    if (isLoaderModalOpen) {
      // dispatch(closeLoaderModal());
      // запрет закрытия модалки с лоадером
      return
    }

    dispatch(closeOrderModal());
    dispatch(clearIngredientsConstructor())
  };

  const handleDeleteIngredient = useCallback((key: string) => {
    dispatch(deleteIngredientFromConstructor(key));
  }, [dispatch]);

  const totalPrice = useMemo(() => {
    let bunsPrice = 0;
    if (bun) {
      bunsPrice = bun.price * 2;
    }

    const ingredientsPrice = ingredients.reduce((acc: number, item: TDragIngredient) => acc + item.price, 0);

    return bunsPrice + ingredientsPrice
  }, [bun, ingredients])

  const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
    const newIngredients = [...ingredients]
    const dragIngredient = ingredients[dragIndex]
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragIngredient);
    // сокращенный варик
    // newIngredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0]);

    dispatch(moveIngredientCard(newIngredients))
  }, [dispatch, ingredients]);

  return ingredientsData && Boolean(ingredientsData.length) ? (
    <section className={styles.section}>
      <h2 className='visually-hidden'>Конструктор бургеров</h2>
      <div className={`${styles.burger_constructor} mb-10`} ref={dropRef} data-testid='drop'>
        {!bun ? (
          <BurgerEmpty position='top' />
        ) : (
          <ConstructorElement
            text={`${bun.name} ${'(верх)'}`}
            price={bun.price}
            thumbnail={bun.image_mobile}
            isLocked={bun.type === 'bun'}
            type={'top'}
          />
          )}
        <div className={`${styles.burger_constructor_scroll} custom-scroll`}>
          {ingredients.length === 0 ? (
            <BurgerEmpty />
          ) : (
            ingredients.map((ingredientItem: TDragIngredient, index: number) => (
              <BurgerConstructorElement
                key={ingredientItem.key}
                ingredient={ingredientItem}
                type="primary"
                handleClose={() => handleDeleteIngredient(ingredientItem.key)}
                index={index}
                moveIngredient={moveIngredient}
              />
            ))
          )}
        </div>
        {!bun ? (
          <BurgerEmpty position='bottom' />
        ) : (
          <ConstructorElement
            text={`${bun.name} ${'(низ)'}`}
            price={bun.price}
            thumbnail={bun.image_mobile}
            isLocked={bun.type === 'bun'}
            type={'bottom'}
          />
        )}
      </div>

      <div className={`${styles.order_wrapper} mr-4`}>
        <div className={`${styles.currency_wrapper} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button disabled={!ingredients.length || !bun} htmlType="button" type="primary" size="large" onClick={handlePostOrder} data-testid='order-button'>Оформить заказ</Button>
      </div>

      {isLoaderModalOpen && (
        <Modal
          header={'Оформляем заказ...'}
          onClose={handleCloseModal}
        >
          <Loader />
        </Modal>)
      }

      {isOrderModalOpen && (
        <Modal
          header={''}
          onClose={handleCloseModal}
        >
          <OrderDetails />
        </Modal>)
      }

    </section>
  ) : null
}
