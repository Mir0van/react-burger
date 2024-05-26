import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientList from '../ingredient-list/ingredient-list';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function BurgerIngredients({
  ingredientsData, 
  isLoading, 
  hasError,
  isModalRendered, 
  setIsModalRendered,
  visible,
  handleOpenModal,
  handleCloseModal,
  selectedIngredient
}) {
  const [currentTab, setCurrentTab] = React.useState('bun')
  const [sortedIngredientsByType, setSortedIngredientsByType] = useState(null);

  useEffect(() => {
    if (ingredientsData && ingredientsData.length) {
      const groupedArray = ingredientsData.reduce((acc, item) => {
        const existingIndex = acc.findIndex(group => group[0]?.type === item.type);
        if (existingIndex !== -1) {
          acc[existingIndex].push(item);
        } else {
          acc.push([item]);
        }
        return acc;
      }, []);

      const sortedArray = groupedArray.sort((a, b) => {
        const order = { bun: 1, sauce: 2, main: 3 };
        return order[a[0].type] - order[b[0].type];
      });

      
      setSortedIngredientsByType(sortedArray);
      console.log('перерасчет сортированного списка')
    }
  }, [ingredientsData]);

  const getIngredientTypeTitle = (type) => {
    switch (type) {
      case 'bun':
        return 'Булки';
      case 'sauce':
        return 'Соусы';
      case 'main':
        return 'Начинки';
      default:
        return type;
    }
  };

  // console.log(ingredientsData, 'ingredientsData')
  // console.log(selectedIngredient, 'selectedIngredient')

  return (
    <>
      <section className={styles.section}>
        <h2 className='text text_type_main-large mb-5'>Соберите бургер</h2>
        <div className='mb-10' style={{ display: 'flex' }}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
            Начинки
          </Tab>
        </div>

        <div className={`${styles.ingredients__container} custom-scroll`}>
          {isLoading && <p className='text text_type_main-medium'>Загрузка...</p>}
          {hasError && <p className='text text_type_main-medium'>Произошла ошибка...</p>}
          {sortedIngredientsByType 
            && sortedIngredientsByType.length
            && sortedIngredientsByType.map((ingredients) => (
              <IngredientList 
                key={ingredients[0].type}
                title={getIngredientTypeTitle(ingredients[0].type)} 
                ingredients={ingredients}
                handleOpenModal={handleOpenModal}
              />
          ))}
        </div>
      </section>

      {visible === 'ingredientDetails' && selectedIngredient &&
        <Modal
          header={'Детали ингредиента'}
          onCloseClick={handleCloseModal}
          setIsModalRendered={setIsModalRendered}
          isModalRendered={isModalRendered}
        >
          <IngredientDetails selectedIngredient={selectedIngredient}/>
        </Modal>
      }
    </>
  )
}

BurgerIngredients.propTypes = {
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
  })),
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  isModalRendered: PropTypes.bool.isRequired,
  visible: PropTypes.string.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  selectedIngredient: PropTypes.object,
};