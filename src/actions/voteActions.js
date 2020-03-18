export const castVote = voteData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('votes') // Todo: consider storing votes seperately, or as part of log.
      .add({ ...voteData, userID: 'TODO' })
      .then(() => {
        // Todo: consider updating state here vs via websocket
      })
      .catch(err => {
        // Todo: Handle error
      });
  };
};
