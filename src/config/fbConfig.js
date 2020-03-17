import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyAOo8ogmV8k9nG7AigLBzbbcR0NH7MdNVU',
  authDomain: 'founderlogs.firebaseapp.com',
  databaseURL: 'https://founderlogs.firebaseio.com',
  projectId: 'founderlogs',
  storageBucket: 'founderlogs.appspot.com',
  messagingSenderId: '1044430169505',
  appId: '1:1044430169505:web:615d630af135c2a50dd7e0',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
