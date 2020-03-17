import { combineReducers } from 'redux';
import simulationScoreReducer from './simulationScore';
import simulationBuyIn from './simulationBuyIn';
import menuActiveViewReducer from './menuActiveView';
import voteReducer from './voteReducer';
import { firestoreReducer } from 'redux-firestore';

const allReducers = combineReducers({
  simulationScore: simulationScoreReducer,
  simulationBuyIn,
  menuActiveView: menuActiveViewReducer,
  vote: voteReducer,
  firestore: firestoreReducer,
});

export default allReducers;
