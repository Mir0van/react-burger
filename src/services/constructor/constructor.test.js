import {
  constructorSlice,
  addBunToConstructor,
  addIngredientsToConstructor,
  clearIngredientsConstructor,
  deleteIngredientFromConstructor,
  moveIngredientCard,
  initialState
} from './reducer';

const mockBun = {
  _id: '1',
  name: 'Bun',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 50,
  image: 'bun.jpg',
  image_mobile: 'bun_mobile.jpg',
  image_large: 'bun_large.jpg',
  __v: 0
};

const mockIngredient = {
  _id: '2',
  name: 'Lettuce',
  type: 'main',
  proteins: 5,
  fat: 1,
  carbohydrates: 2,
  calories: 15,
  price: 10,
  image: 'lettuce.jpg',
  image_mobile: 'lettuce_mobile.jpg',
  image_large: 'lettuce_large.jpg',
  __v: 0,
  key: 'unique_key'
};

const mockIngredient2 = {
  ...mockIngredient,
  _id: '3',
  name: 'Tomato',
  key: 'unique_key_2'
};

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(constructorSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addBunToConstructor', () => {
    const nextState = constructorSlice.reducer(initialState, addBunToConstructor(mockBun));
    expect(nextState.bun).toEqual(mockBun);
  });

  it('should handle addIngredientsToConstructor', () => {
    const nextState = constructorSlice.reducer(initialState, addIngredientsToConstructor(mockIngredient));
    expect(nextState.ingredients).toEqual([mockIngredient]);
  });

  it('should handle clearIngredientsConstructor', () => {
    const previousState = { bun: mockBun, ingredients: [mockIngredient] };
    const nextState = constructorSlice.reducer(previousState, clearIngredientsConstructor());
    expect(nextState.bun).toBeNull();
    expect(nextState.ingredients).toEqual([]);
  });

  it('should handle deleteIngredientFromConstructor', () => {
    const previousState = { ...initialState, ingredients: [mockIngredient, mockIngredient2] };
    const nextState = constructorSlice.reducer(previousState, deleteIngredientFromConstructor(mockIngredient.key));
    expect(nextState.ingredients).toEqual([mockIngredient2]);
  });

  it('should handle moveIngredientCard', () => {
    const previousState = { ...initialState, ingredients: [mockIngredient, mockIngredient2] };
    const nextState = constructorSlice.reducer(previousState, moveIngredientCard([mockIngredient2, mockIngredient]));
    expect(nextState.ingredients).toEqual([mockIngredient2, mockIngredient]);
  });
});