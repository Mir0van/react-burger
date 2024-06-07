import React, { useMemo } from 'react';
// import { ingredientPropType } from '../../utils/prop-types';
// import PropTypes from 'prop-types';
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
  const dispatch = useDispatch();

  const sortedIngredientsByType = useMemo(() => {
    if (!ingredientsData || !ingredientsData.length) {
      return ingredientsData;
    };

    console.log('перерасчет sortedIngredientsByType в BurgerIngredients')
    const groupedArray = ingredientsData.reduce((acc, item) => {
      const existingIndex = acc.findIndex(group => group[0]?.type === item.type);
      if (existingIndex !== -1) {
        acc[existingIndex].push(item);
      } else {
        acc.push([item]);
      }
      return acc;
    }, []);

    return groupedArray.sort((a, b) => {
      const order = { bun: 1, sauce: 2, main: 3 };
      return order[a[0].type] - order[b[0].type];
    });
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

  const handleCloseModal = () => dispatch(closeIngredientModal());
  const handleTabClick = (value) => {
    dispatch(setCurrentTab(value));
  };

  return (
    <>
      <section className={styles.section}>
        <h2 className='text text_type_main-large mb-5'>Соберите бургер</h2>
        <div className={`${styles.tabs}  mb-10`}>
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

        <div className={`${styles.ingredients__container} custom-scroll`}>
          {isLoading && <p className='text text_type_main-medium'>Загрузка...</p>}
          {error && <p className='text text_type_main-medium'>Произошла ошибка...</p>}

          {sortedIngredientsByType
            && sortedIngredientsByType.length > 0
            && sortedIngredientsByType.map((ingredients) => (
              <IngredientList
                key={ingredients[0].type}
                title={getIngredientTypeTitle(ingredients[0].type)}
                ingredients={ingredients}
              />
            ))}
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

BurgerIngredients.propTypes = {
  // ingredientsData: PropTypes.arrayOf(ingredientPropType).isRequired,
  // isLoading: PropTypes.bool.isRequired,
  // error: PropTypes.bool.isRequired,
};