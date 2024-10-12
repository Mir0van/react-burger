import { 
  feedProfileSlice, 
  wsOrdersProfileConnecting, 
  wsOrdersProfileOpen, 
  wsOrdersProfileClose, 
  wsOrdersProfileError, 
  wsOrdersProfileMessage, 
  initialState 
} from './reducer';
import { WebsocketStatus } from "../../utils/types";

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

const mockWsData = {
  orders: [
    mockSingleOrder,
    mockSingleOrder,
  ],
  total: 100,
  totalToday: 10,
};

describe('feedProfileSlice', () => {
  it('should return the initial state', () => {
    expect(feedProfileSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle wsOrdersProfileConnecting', () => {
    const result = feedProfileSlice.reducer(initialState, wsOrdersProfileConnecting());
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it('should handle wsOrdersProfileOpen', () => {
    const result = feedProfileSlice.reducer(initialState, wsOrdersProfileOpen());
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it('should handle wsOrdersProfileClose', () => {
    const result = feedProfileSlice.reducer(initialState, wsOrdersProfileClose());
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it('should handle wsOrdersProfileError', () => {
    const error = 'Connection error';
    const result = feedProfileSlice.reducer(initialState, wsOrdersProfileError(error));
    expect(result).toEqual({
      ...initialState,
      connectionError: error,
    });
  });

  it('should handle wsOrdersProfileMessage', () => {
    const result = feedProfileSlice.reducer(initialState, wsOrdersProfileMessage(mockWsData));
    expect(result).toEqual({
      ...initialState,
      data: mockWsData,
    });
  });
});
 