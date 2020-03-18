import { combineReducers } from 'redux';
import simulation from './simulationReducer';
import menu from './menuReducer';
import voteReducer from './voteReducer';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  simulation,
  menu,
  vote: voteReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
