export const setSimulationScore = nr => {
  return {
    type: 'SET_SIMULATION_SCORE',
    payload: nr,
  };
};

export const setSimulationBuyIn = nr => {
  return {
    type: 'SET_SIMULATION_BUY_IN',
    payload: nr,
  };
};

export const setSimulationMultiplier = nr => {
  return {
    type: 'SET_SIMULATION_MULTIPLIER',
    payload: nr,
  };
};
