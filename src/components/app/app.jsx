import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/burger-api';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false)
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    getIngredients()
      .then(({data}) => {
        setIngredientsData(data);
      })
      .catch((error) => {
        setHasError(true);
        console.error("Error fetching ingredients:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <AppHeader/>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={`${styles.section_wrapper} pt-10 pb-10`}>
            <BurgerIngredients 
              ingredientsData={ingredientsData} 
              isLoading={isLoading} 
              hasError={hasError}
            />
            <BurgerConstructor 
              ingredientsData={ingredientsData}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
