import React, { useMemo } from 'react'
import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { addSelectedIngredient } from '../../services/ingredients/reducer';

export default function IngredientDetails() {
  const ingredients = useSelector((store) => store.ingredients.ingredientsData);
  const {ingredientId} = useParams();
  // const dispatch = useDispatch();

  const selectedIngredient = useMemo(
    () => (ingredients.find((ingredient) => ingredient._id === ingredientId)),
    [ingredients, ingredientId]
  );

  if (!selectedIngredient) {
    return null;
  }

  // временно оставил. пока не знаю нужена эта инфа будет или нет, удалю после ревью
  // dispatch(addSelectedIngredient(selectedIngredient));

  return (
    <div className={styles.container}>
      <div className={`${styles.image} mb-3`}>
        <img src={selectedIngredient.image_large} width={480} height={240} alt={selectedIngredient.name} />
      </div>
      <p className='text text_type_main-medium mb-8'>{selectedIngredient.name}</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={`${styles.defenition} text text_type_main-default text_color_inactive mb-2`}>Калории,ккал</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>{selectedIngredient.calories}</p>
        </li>
        <li className={styles.item}>
          <p className={`${styles.defenition} text text_type_main-default text_color_inactive mb-2`}>Белки, г</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>{selectedIngredient.proteins}</p>
        </li>
        <li className={styles.item}>
          <p className={`${styles.defenition} text text_type_main-default text_color_inactive mb-2`}>Жиры, г</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>{selectedIngredient.fat}</p>
        </li>
        <li className={styles.item}>
          <p className={`${styles.defenition} text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>{selectedIngredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

