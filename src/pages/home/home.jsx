import styles from './home.module.css';
import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={`${styles.section_wrapper} pt-10 pb-10`}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </div>
    </main>
  )
}
