import styles from './home.module.css';
import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';

export default function Home() {
  // @ts-ignore
  const { isLoading } = useSelector((store) => store.ingredients)
  
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.section_wrapper} pt-10 pb-10`}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </div>

      {/* лоадер пока чекает загрузку ингридиентов */}
      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </>
  )
}
