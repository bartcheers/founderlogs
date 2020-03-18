const simulation = (
  state = {
    buyIn: 0,
    multiplier: 1,
    score: 0,
  },
  action,
) => {
  switch (action.type) {
    case 'SET_SIMULATION_BUY_IN':
      return {
        ...state,
        buyIn: action.payload,
      };
    case 'SET_SIMULATION_SCORE':
      return {
        ...state,
        score: action.payload,
      };
    case 'SET_SIMULATION_MULTIPLIER':
      return {
        ...state,
        multiplier: action.payload,
      };
    default:
      return state;
  }
};
export default simulation;
