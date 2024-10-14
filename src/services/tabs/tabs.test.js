import {
  tabsSlice,
  setCurrentTab,
  initialState
} from './reducer';

describe('tabs reducer', () => {
  it('should return the initial state', () => {
    expect(tabsSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setCurrentTab to "bun"', () => {
    const nextState = tabsSlice.reducer(initialState, setCurrentTab('bun'));
    expect(nextState.currentTab).toBe('bun');
  });

  it('should handle setCurrentTab to "main"', () => {
    const nextState = tabsSlice.reducer(initialState, setCurrentTab('main'));
    expect(nextState.currentTab).toBe('main');
  });

  it('should handle setCurrentTab to "sauce"', () => {
    const nextState = tabsSlice.reducer(initialState, setCurrentTab('sauce'));
    expect(nextState.currentTab).toBe('sauce');
  });
});
