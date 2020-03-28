import { combineReducers } from 'redux';
import simulation from './simulationReducer';
import menu from './menuReducer';
import voteReducer from './voteReducer';

const rootReducer = combineReducers({
  simulation,
  menu,
  vote: voteReducer,
});

export default rootReducer;
