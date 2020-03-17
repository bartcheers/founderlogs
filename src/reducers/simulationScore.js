const simulationScoreReducer = (state = 0, action) => {
  switch (action.type) {
    case 'setSimulationScore':
      return action.payload;
    default:
      return state;
  }
};
export default simulationScoreReducer;
