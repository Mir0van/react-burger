export const ORDER_MODAL_OPEN = 'ORDER_MODAL_OPEN';
export const ORDER_MODAL_CLOSE = 'ORDER_MODAL_CLOSE';
export const INGREDIENT_MODAL_OPEN = 'INGREDIENT_MODAL_OPEN';
export const INGREDIENT_MODAL_CLOSE = 'INGREDIENT_MODAL_CLOSE';

export const setModalVisibility = (type, isVisible) => ({
  type,
  payload: isVisible
})