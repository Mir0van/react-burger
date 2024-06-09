import React, { useRef } from 'react'
import styles from './burger-constructor-element.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/prop-types';
import { useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

const BurgerConstructorElement = ({ dragIcon, type, ingredient, handleClose, index, moveIngredient }) => {
  const { dragIngredientType } = useSelector((store) => store.ingredients)
  const ref = useRef(null)

  const [, dropRef] = useDrop({
    accept: 'card',
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveIngredient(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'card',
    item: () => {
      console.log(ingredient?.key, 'drag sort ingredient')
      console.log(index, 'dragIndex')
      return { ingredient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  dragRef(dropRef(ref))

  if (!ingredient && type !== 'primary') {
    return (
      <div className={`
        ${styles.empty} 
        ${type === 'top' ? styles.empty_top : styles.empty_bottom} 
        ${dragIngredientType === 'bun' && styles.empty_hover}`
      }>
        <p className='text text_type_main-default'>Выберите булку</p>
      </div>
    );
  }

  if (!ingredient && type === 'primary') {
    return (
      <div className={`
        ${styles.empty} 
        ${styles.empty_center} 
        ${dragIngredientType !== null && dragIngredientType !== 'bun' && styles.empty_hover}`
      }>
        <p className='text text_type_main-default'>Выберите ингредиент</p>
      </div>
    );
  }

  if (dragIcon) {
    return (
      <div className={styles.element_container} ref={ref} style={{ opacity: opacity }}>
        <DragIcon type={type} />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          isLocked={ingredient.type === 'bun'}
          type={type}
          handleClose={handleClose}
        />
      </div>
    )
  }

  return (
    <ConstructorElement
      text={`${ingredient.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
      price={ingredient.price}
      thumbnail={ingredient.image_mobile}
      isLocked={ingredient.type === 'bun'}
      type={type}
      handleClose={handleClose}
    />
  );
};

BurgerConstructorElement.propTypes = {
  dragIcon: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  handleClose: PropTypes.func,
  moveIngredient: PropTypes.func,
  ingredient: PropTypes.oneOfType([
    ingredientPropType,
    PropTypes.oneOf([null])
  ]),
  index: PropTypes.number
};

export default BurgerConstructorElement;
