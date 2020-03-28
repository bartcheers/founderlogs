import firebase from 'firebase/app';
import fbConfig from './config/fbConfig';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig);
}

const db = firebase.firestore().collection('logs');

export const getRandomLogDB = () => {
  return new Promise((resolve, reject) => {
    const key = db.doc().id;

    db.where(firebase.firestore.FieldPath.documentId(), '>=', key)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            let log = doc.data();
            log['id'] = doc.id;
            console.log('log', log);
            resolve(log);
          });
        } else {
          db.where(firebase.firestore.FieldPath.documentId(), '<', key)
            .limit(1)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                let log = doc.data();
                log['id'] = doc.id;
                console.log('log', log);

                resolve(log);
              });
            })
            .catch(err => {
              console.log('Error getting documents', err);
            });
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  });
};

export const updateWinningLogDB = voteData => {
  db.doc(voteData.id)
    .update({
      votersFor: firebase.firestore.FieldValue.arrayUnion('TODO'),
      feedback: firebase.firestore.FieldValue.arrayUnion({
        userID: 'TODO',
        feedback: voteData.feedback,
      }),
    })
    .then(() => {})
    .catch(err => {});
};

export const updateLosingLogDB = voteData => {
  db.doc(voteData.id)
    .update({
      votersAgainst: firebase.firestore.FieldValue.arrayUnion('TODO'),
      feedback: firebase.firestore.FieldValue.arrayUnion({
        userID: 'TODO',
        feedback: voteData.feedback,
      }),
    })
    .then(() => {})
    .catch(err => {});
};

export const createLogDB = logData => {
  db.add({ ...logData, userID: 'TODO' })
    .then(() => {})
    .catch(err => {});
};
