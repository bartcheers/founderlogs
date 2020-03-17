const simulationBuyInReducer = (state = 0, action) => {
  switch (action.type) {
    case 'setSimulationBuyIn':
      return action.payload;
    default:
      return state;
  }
};
export default simulationBuyInReducer;
