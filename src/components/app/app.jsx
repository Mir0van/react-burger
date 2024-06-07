import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../services/ingredients/actions';
import { useDispatch } from 'react-redux';
// import { nanoid } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  // console.log(uuidv4())
  // console.log(nanoid(), 'nanoid()')

  return (
    <div className={styles.wrapper}>
      <AppHeader/>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={`${styles.section_wrapper} pt-10 pb-10`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
