import { 
  feedSlice, 
  wsOrdersConnecting, 
  wsOrdersOpen, 
  wsOrdersClose, 
  wsOrdersError, 
  wsOrdersMessage, 
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

describe('feedSlice', () => {
  it('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle wsOrdersConnecting', () => {
    const result = feedSlice.reducer(initialState, wsOrdersConnecting());
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it('should handle wsOrdersOpen', () => {
    const result = feedSlice.reducer(initialState, wsOrdersOpen());
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it('should handle wsOrdersClose', () => {
    const result = feedSlice.reducer(initialState, wsOrdersClose());
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it('should handle wsOrdersError', () => {
    const error = 'Connection error';
    const result = feedSlice.reducer(initialState, wsOrdersError(error));
    expect(result).toEqual({
      ...initialState,
      connectionError: error,
    });
  });

  it('should handle wsOrdersMessage', () => {
    const result = feedSlice.reducer(initialState, wsOrdersMessage(mockWsData));
    expect(result).toEqual({
      ...initialState,
      data: mockWsData,
    });
  });
});
