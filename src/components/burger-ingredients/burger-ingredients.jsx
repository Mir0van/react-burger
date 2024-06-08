import React, { useMemo, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientList from '../ingredient-list/ingredient-list';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { closeIngredientModal } from '../../services/modals/reducer';
import { setCurrentTab } from '../../services/tabs/reducer';

export default function BurgerIngredients() {
  const {currentTab} = useSelector(store => store.tabs)
  const {isIngredientModalOpen} = useSelector(store => store.modals)
  const {ingredientsData, isLoading, error} = useSelector(store => store.ingredients)
  const {bun, ingredients} = useSelector(store => store.burgerConstructor)
  const dispatch = useDispatch();
  const bunsRef = useRef(null)
  const mainsRef = useRef(null)
  const saucesRef = useRef(null)
  const tabsRef = useRef(null)

  const buns = useMemo(
    () => ingredientsData.filter((item) => item.type === "bun"),
    [ingredientsData]
  );

  const mains = useMemo(
    () => ingredientsData.filter((item) => item.type === "main"),
    [ingredientsData]
  );

  const sauces = useMemo(
    () => ingredientsData.filter((item) => item.type === "sauce"),
    [ingredientsData]
  );

  const countersValue = useMemo(() => {
    console.log('посчитал каунтер')
  
    const countObject = ingredients.reduce((acc, item) => {
      if (!item) return acc; 
  
      const itemId = item._id;
      if (acc[itemId]) {
        acc[itemId]++;
      } else {
        acc[itemId] = 1;
      }
      return acc;
    }, {});

    if (bun) {
      const bunId = bun._id;
      if (countObject[bunId]) {
        countObject[bunId] += 2;
      } else {
        countObject[bunId] = 2;
      }
    }
  
    return countObject;
  }, [ingredients, bun]);

  console.log(countersValue)


  const handleCloseModal = () => dispatch(closeIngredientModal());

  const handleTabClick = (value) => {
    dispatch(setCurrentTab(value));

    const refMap = {
      'bun': bunsRef,
      'sauce': saucesRef,
      'main': mainsRef
    };
    refMap[value].current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollIngredients = () => {
    if (!bunsRef || !mainsRef || !saucesRef || !tabsRef) {
      return;
    }

    const tabsRefBottom = tabsRef.current.getBoundingClientRect().bottom
    const bunsRefTop = bunsRef.current.getBoundingClientRect().top
    const mainsRefTop = mainsRef.current.getBoundingClientRect().top
    const saucesRefTop = saucesRef.current.getBoundingClientRect().top

    const bunsDistance = Math.abs(tabsRefBottom - bunsRefTop)
    const mainsDistance = Math.abs(tabsRefBottom - mainsRefTop)
    const saucesDistance = Math.abs(tabsRefBottom - saucesRefTop)

    const minDistance = Math.min(bunsDistance, mainsDistance, saucesDistance);
    const minDistanceBetweenBlocks = 100;

    if (minDistance === bunsDistance && minDistanceBetweenBlocks > bunsDistance) {
      dispatch(setCurrentTab('bun'));
    } else if (minDistance === mainsDistance && minDistanceBetweenBlocks > mainsDistance) {
      dispatch(setCurrentTab('main'));
    } else if (minDistance === saucesDistance && minDistanceBetweenBlocks > saucesDistance) {
      dispatch(setCurrentTab('sauce'));
    }
  }

  if (isLoading) {
    return (
      <section className={styles.section}>
        <h2 className='text text_type_main-large mb-5'>Загрузка...</h2>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.section}>
        <h2 className='text text_type_main-large mb-5'>Произошла ошибка...</h2>
      </section>
    )
  }

  if (!ingredientsData || ingredientsData.length === 0) {
    return null
  }

  return (
    <>
      <section className={styles.section}>
        <h2 className='text text_type_main-large mb-5'>Соберите бургер</h2>
        <div className={`${styles.tabs}  mb-10`} ref={tabsRef}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={handleTabClick}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleTabClick}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={handleTabClick}>
            Начинки
          </Tab>
        </div>

        <div className={`${styles.ingredients__container} custom-scroll`} onScroll={handleScrollIngredients}>
          <IngredientList
            title='Булки'
            ingredients={buns}
            ref={bunsRef}
            countersValue={countersValue}
          />
          <IngredientList
            title='Соусы'
            ingredients={sauces}
            ref={saucesRef}
            countersValue={countersValue}
          />
          <IngredientList
            title='Начинки'
            ingredients={mains}
            ref={mainsRef}
            countersValue={countersValue}
          />
        </div>
      </section>

      {isIngredientModalOpen && (
        <Modal
          header={'Детали ингредиента'}
          onClose={handleCloseModal}
        >
          <IngredientDetails />
        </Modal>)
      }
    </>
  )
}
