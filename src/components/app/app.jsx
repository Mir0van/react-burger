import React, {useEffect, useState, useRef} from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ANIMATION_DELAY } from '../../utils/constants';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false)
  const [ingredientsData, setIngredientsData] = useState(null);
  
  const ingredientsApi = 'https://norma.nomoreparties.space/api/ingredients';
  
  const [visible, setVisible] = useState('')
  const [isModalRendered, setIsModalRendered] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await fetch(ingredientsApi);
        if (!response.ok) {
          setHasError(true);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setIngredientsData(data.data);
      } catch (error) {
        setHasError(true);
        console.error("Error fetching ingredients:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getProductData();
  }, [])

  const handleOpenModal = (id, ingredient = null) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(id);
    setSelectedIngredient(ingredient);
  }

  const handleCloseModal = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setVisible('');
      setSelectedIngredient(null);
    }
    
    setIsModalRendered(false);

    timeoutRef.current = setTimeout(() => {
      setVisible('');
      setSelectedIngredient(null);
      timeoutRef.current = null;
    }, ANIMATION_DELAY);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <AppHeader/>
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={`${styles.section_wrapper} pt-10 pb-10`}>
              <BurgerIngredients 
                ingredientsData={ingredientsData} 
                isLoading={isLoading} 
                hasError={hasError}
                isModalRendered={isModalRendered}
                setIsModalRendered={setIsModalRendered}
                visible={visible}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                selectedIngredient={selectedIngredient}
              />
              <BurgerConstructor 
                ingredientsData={ingredientsData}
                isModalRendered={isModalRendered}
                setIsModalRendered={setIsModalRendered}
                visible={visible}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
