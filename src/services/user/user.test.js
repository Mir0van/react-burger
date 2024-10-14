import { userSlice, initialState } from './reducer';
import {
  login,
  logout,
  getUser,
  updateUserData
} from './actions';

describe('userSlice', () => {
  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle login.pending', () => {
    const state = {
      ...initialState,
      error: null,
      isLoading: false,
    };

    const action = { type: login.pending.type };
    const result = userSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('should handle login.fulfilled', () => {
    const state = {
      ...initialState,
      isLoading: true,
    };

    const user = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const action = { type: login.fulfilled.type, payload: user };
    const result = userSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      user,
      isLoading: false,
    });
  });

  it('should handle login.rejected', () => {
    const state = {
      ...initialState,
      isLoading: true,
    };

    const error = 'Network error';

    const action = { type: login.rejected.type, error: { message: error } };
    const result = userSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      error,
    });
  });

  it('should handle logout.fulfilled', () => {
    const state = {
      ...initialState,
      user: {
        email: 'test@example.com',
        name: 'Test User',
      },
    };

    const action = { type: logout.fulfilled.type };
    const result = userSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      user: null,
      isLoading: false,
    });
  });

  it('should handle getUser.fulfilled', () => {
    const state = {
      ...initialState,
      isLoading: true,
      isAuthChecked: false,
    };

    const user = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const action = { type: getUser.fulfilled.type, payload: user };
    const result = userSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      user,
      isLoading: false,
      isAuthChecked: true,
    });
  });

  it('should handle getUser.rejected', () => {
    const state = {
      ...initialState,
      isLoading: true,
      isAuthChecked: false,
    };

    const error = 'Network error';

    const action = { type: getUser.rejected.type, error: { message: error } };
    const result = userSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      error,
      isAuthChecked: true,
    });
  });

  it('should handle updateUserData.fulfilled', () => {
    const state = {
      ...initialState,
      isLoading: true,
    };

    const updatedUser = {
      email: 'test@example.com',
      name: 'Updated User',
    };

    const action = { type: updateUserData.fulfilled.type, payload: updatedUser };
    const result = userSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      user: updatedUser,
      isLoading: false,
    });
  });
});
