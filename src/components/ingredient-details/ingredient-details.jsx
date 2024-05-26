import React from 'react'
import styles from './ingredient-details.module.css'
import PropTypes from 'prop-types';

export default function IngredientDetails({selectedIngredient}) {
  // console.log(selectedIngredient, 'selectedIngredient')
  return (
    <div className={styles.container}>
      <div className={`${styles.image} mb-3`}>
        <img src={selectedIngredient.image_large} width={480} height={240} alt={selectedIngredient.name} />
      </div>
      <p className='text text_type_main-medium mb-8'>{selectedIngredient.name}</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p style={{textAlign: 'center'}} className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
          <p style={{textAlign: 'center'}} className='text text_type_digits-default text_color_inactive'>{selectedIngredient.calories}</p>
        </li>
        <li className={styles.item}>
          <p style={{textAlign: 'center'}} className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
          <p style={{textAlign: 'center'}} className='text text_type_digits-default text_color_inactive'>{selectedIngredient.proteins}</p>
        </li>
        <li className={styles.item}>
          <p style={{textAlign: 'center'}} className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
          <p style={{textAlign: 'center'}} className='text text_type_digits-default text_color_inactive'>{selectedIngredient.fat}</p>
        </li>
        <li className={styles.item}>
          <p style={{textAlign: 'center'}} className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
          <p style={{textAlign: 'center'}} className='text text_type_digits-default text_color_inactive'>{selectedIngredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  selectedIngredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number,
  }).isRequired,
};
