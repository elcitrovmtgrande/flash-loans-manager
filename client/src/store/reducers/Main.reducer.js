const INITIAL_STATE = {
  strategies: [],
  events: [],
};

const mainReducer = (state = INITIAL_STATE, action = null) => {
  let nextState = {};
  switch (action.type) {
    case 'UPDATE_STRATEGIES':
      const { strategies: initialStrategies } = state;
      const strategies = JSON.parse(JSON.stringify(initialStrategies));
      strategies.push(action.value);
      nextState = {
        ...state,
        strategies,
      };
      return nextState;
    case 'UPDATE_EVENTS':
      const { events: initialEvents } = state;
      const events = JSON.parse(JSON.stringify(initialEvents));
      events.push(action.value);
      nextState = {
        ...state,
        events,
      };
      return nextState;
    default:
      return state;
  }
};

export default mainReducer;
