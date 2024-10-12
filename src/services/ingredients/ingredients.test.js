import {
  ingredientsSlice,
  addSelectedIngredient,
  deleteSelectedIngredient,
  addDragIngredient,
  deleteDragIngredient,
  initialState
} from './reducer';
import { getIngredients } from './actions';
import { mockIngredientsData } from '../../utils/mockData';

const mockIngredient = mockIngredientsData[0];

describe('ingredientsSlice', () => {
  it('should return the initial state', () => {
    expect(ingredientsSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addSelectedIngredient', () => {
    const result = ingredientsSlice.reducer(initialState, addSelectedIngredient(mockIngredient));
    expect(result).toEqual({
      ...initialState,
      selectedIngredient: mockIngredient,
    });
  });

  it('should handle deleteSelectedIngredient', () => {
    const stateWithSelected = { ...initialState, selectedIngredient: mockIngredient };
    const result = ingredientsSlice.reducer(stateWithSelected, deleteSelectedIngredient());
    expect(result).toEqual({
      ...initialState,
      selectedIngredient: null,
    });
  });

  it('should handle addDragIngredient', () => {
    const dragType = 'bun';
    const result = ingredientsSlice.reducer(initialState, addDragIngredient(dragType));
    expect(result).toEqual({
      ...initialState,
      dragIngredientType: dragType,
    });
  });

  it('should handle deleteDragIngredient', () => {
    const stateWithDrag = { ...initialState, dragIngredientType: 'bun' };
    const result = ingredientsSlice.reducer(stateWithDrag, deleteDragIngredient());
    expect(result).toEqual({
      ...initialState,
      dragIngredientType: null,
    });
  });

  it('should handle getIngredients.pending', () => {
    const result = ingredientsSlice.reducer(initialState, { type: getIngredients.pending.type });
    expect(result).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('should handle getIngredients.fulfilled', () => {
    const result = ingredientsSlice.reducer(initialState, { type: getIngredients.fulfilled.type, payload: mockIngredientsData });
    expect(result).toEqual({
      ...initialState,
      ingredientsData: mockIngredientsData,
      isLoading: false,
    });
  });

  it('should handle getIngredients.rejected', () => {
    const error = 'Fetch error';
    const result = ingredientsSlice.reducer(initialState, { type: getIngredients.rejected.type, error: { message: error } });
    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      error: error,
    });
  });
});
