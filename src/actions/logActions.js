export const createLog = logData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('logs')
      .add({ ...logData, userID: 'TODO' })
      .then(() => {
        // Todo: consider updating state here vs via websocket
      })
      .catch(err => {
        // Todo: Handle error
      });
  };
};
