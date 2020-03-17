export const setSimulationScore = nr => {
  return {
    type: 'setSimulationScore',
    payload: nr,
  };
};

export const setSimulationBuyIn = nr => {
  return {
    type: 'setSimulationBuyIn',
    payload: nr,
  };
};
