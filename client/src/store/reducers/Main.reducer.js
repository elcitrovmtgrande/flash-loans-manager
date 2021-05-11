const INITIAL_STATE = {
  pairs: [],
};

const mainReducer = (state = INITIAL_STATE, action = null) => {
  let nextState = {};
  switch (action.type) {
    case 'UPDATE_CONNECTION':
      nextState = {
        ...state,
        isConnected: action.value,
      };
      return nextState;
    case 'MOVE_CARD':
      nextState = {
        ...state,
        moveCard: action.value ? action.value : state.moveCard,
      };
      return nextState;
    default:
      return state;
  }
};

export default mainReducer;
