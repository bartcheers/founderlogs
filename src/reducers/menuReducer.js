const menu = (state = 0, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_VIEW':
      return action.payload;
    default:
      return state;
  }
};
export default menu;
