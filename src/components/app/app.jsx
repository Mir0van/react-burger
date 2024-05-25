import React from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {ingredientsData} from '../../utils/data';

function App() {
  return (
    <>
      <div className={styles.wrapper}>
        <AppHeader/>
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={`${styles.section_wrapper} pt-10 pb-10`}>
              <BurgerIngredients ingredientsData={ingredientsData}/>
              <BurgerConstructor ingredientsData={ingredientsData}/>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
