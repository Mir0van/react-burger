import React from 'react'
import styles from './ingredient-list.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { TBurgerIngredient } from '../../utils/types';

type TCountersValue = {
  [key: string]: number;
};

type TIngredientListProps = {
  title: string;
  ingredients: Array<TBurgerIngredient>;
  countersValue: TCountersValue;
}

const IngredientList = React.forwardRef<HTMLHeadingElement, TIngredientListProps>(({ title, ingredients, countersValue }, ref): React.JSX.Element => {
  return (
    <div>
      <h3 ref={ref} className='text text_type_main-medium mb-6'>{title}</h3>
      <ul className={styles.ingredient__list}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            ingredient={ingredient}
            count={countersValue[ingredient._id] || 0}
          />
        ))}
      </ul>
    </div>
  )
});

export default IngredientList;
