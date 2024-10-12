import {
  modalsSlice,
  openOrderModal,
  closeOrderModal,
  openLoaderModal,
  closeLoaderModal,
  initialState
} from './reducer';

describe('modals reducer', () => {
  it('should return the initial state', () => {
    expect(modalsSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle openOrderModal', () => {
    const nextState = modalsSlice.reducer(initialState, openOrderModal());
    expect(nextState.isOrderModalOpen).toBe(true);
  });

  it('should handle closeOrderModal', () => {
    const previousState = { ...initialState, isOrderModalOpen: true };
    const nextState = modalsSlice.reducer(previousState, closeOrderModal());
    expect(nextState.isOrderModalOpen).toBe(false);
  });

  it('should handle openLoaderModal', () => {
    const nextState = modalsSlice.reducer(initialState, openLoaderModal());
    expect(nextState.isLoaderModalOpen).toBe(true);
  });

  it('should handle closeLoaderModal', () => {
    const previousState = { ...initialState, isLoaderModalOpen: true };
    const nextState = modalsSlice.reducer(previousState, closeLoaderModal());
    expect(nextState.isLoaderModalOpen).toBe(false);
  });
});
