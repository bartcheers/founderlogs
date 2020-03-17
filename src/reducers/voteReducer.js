const voteReducer = (state = 0, action) => {
  switch (action.type) {
    case 'CAST_VOTE':
      return action.payload;
    default:
      return state;
  }
};
export default voteReducer;
