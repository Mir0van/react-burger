import { 
  SET_CURRENT_TAB 
} from "./actions"

const initialState = {
  currentTab: 'bun',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.payload
      };
    }
    default: {
      return state;
    }
  }
}