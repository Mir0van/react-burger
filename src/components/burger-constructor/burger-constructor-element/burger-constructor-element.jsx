import React from 'react'
import styles from './burger-constructor-element.module.css'
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/prop-types';

export default function BurgerConstructorElement(type, ingredient) {
  return (
    <>
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        isLocked={ingredient.type === 'bun'}
        type={type}
      />
    </>
  )
}

BurgerConstructorElement.propTypes = {
  type: PropTypes.string.isRequired,
  ingredient: ingredientPropType,
};
