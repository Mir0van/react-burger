import React, { useRef } from 'react'
import styles from './burger-constructor-element.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd';
import { TDragIngredient } from '../../../utils/types';

type TBurgerConstructorProps = {
  ingredient: TDragIngredient;
  type: 'secondary' | 'primary' | 'error' | 'success';
  handleClose: () => void;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

type TDragObject = {
  ingredient: TDragIngredient;
  index: number;
}

type TDragCollected = {
  isDragging: boolean;
}

const BurgerConstructorElement = ({ type = 'primary', ingredient, handleClose, index, moveIngredient }: TBurgerConstructorProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const [, dropRef] = useDrop<TDragObject, unknown, unknown>({
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

      if (!clientOffset) {
        return
      }

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

  const [{ isDragging }, dragRef] = useDrag<TDragObject, unknown, TDragCollected>({
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

  return (
    <div className={styles.element_container} ref={ref} style={{ opacity: opacity }}>
      <DragIcon type={type}/>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        isLocked={ingredient.type === 'bun'}
        handleClose={handleClose}
      />
    </div>
  );
};

export default BurgerConstructorElement;
