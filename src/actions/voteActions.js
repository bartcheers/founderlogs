export const castVote = vote => {
  return {
    type: 'CAST_VOTE',
    payload: vote,
  };
};
