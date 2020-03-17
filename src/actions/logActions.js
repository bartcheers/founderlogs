export const fetchLogs = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(logs =>
      dispatch({
        type: 'FETCH_LOGS',
        payload: logs,
      }),
    );
};

export const createLog = logData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('logs')
      .add({ ...logData, userID: 'TODO' })
      .then(() => {
        // dispatch({
        //           type: 'NEW_LOG',
        //           payload: log,
        //         })
      })
      .catch(err => {
        // Todo: Handle error
      });
  };
};
