const menuActiveViewReducer = (state = 0, action) => {
  switch (action.type) {
    case 'setActiveView':
      return action.payload;
    default:
      return state;
  }
};
export default menuActiveViewReducer;
