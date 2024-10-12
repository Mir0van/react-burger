import { orderSlice, initialState, setSingleOrder } from './reducer';
import { postOrder } from './actions';

const mockSingleOrder = {
  _id: "64720c758a4b62001c84177e",
  ingredients: [
    "643d69a5c3f7b9001cfa093d",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa093d"
  ],
  owner: "6471fa118a4b62001c8416cb",
  status: "done",
  name: "Space флюоресцентный бургер",
  createdAt: "2023-05-27T13:58:13.300Z",
  updatedAt: "2023-05-27T13:58:13.373Z",
  number: 5615,
  __v: 0
}

const mockError = {
  message: 'some error message',
};

describe('orderSlice', () => {
  it('should return the initial state', () => {
    expect(orderSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle 'showOrderDetails'", () => {
    const result = orderSlice.reducer(initialState, setSingleOrder(mockSingleOrder));

    expect(result).toEqual({
      ...initialState,
      order: mockSingleOrder
    });
  });

  it("should handle pending create order", () => {
    const state = {
      ...initialState,
      error: null,
      isLoading: false,
    };

    const action = { type: postOrder.pending.type };
    const result = orderSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle successful create order", () => {
    const state = {
      ...initialState,
      error: null,
    };

    const order = {
      name: "order name",
      order: {
        number: 1234
      }, 
    };

    const action = { type: postOrder.fulfilled.type, payload: order };
    const result = orderSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      orderNumber: order.order.number,
      orderName: order.name, 
    });
  });

  it("should handle failed create order", () => {
    const state = {
      ...initialState,
      isLoading: true,
      error: null,
    };

    const action = { type: postOrder.rejected.type, error: mockError };
    const result = orderSlice.reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      error: mockError.message
    });
  });
});
