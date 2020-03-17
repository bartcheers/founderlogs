import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSimulationScore, setSimulationBuyIn } from '../../actions/simulationActions.js';
import './simulation.scss';

export default function Simulation() {
  const simulationScore = useSelector(state => state.simulationScore);
  const simulationBuyIn = useSelector(state => state.simulationBuyIn);
  const dispatch = useDispatch();

  return (
    <div className='settings modal'>
      <h2>Simulation</h2>
      <p>Find out what your pay out will be, based on last week's data.</p>
      <label>Buy in: ${simulationBuyIn * 10}</label>
      <input
        type='range'
        min='0'
        max='10'
        value={simulationBuyIn}
        onChange={e => dispatch(setSimulationBuyIn(e.target.value))}
      />
      <label>Score: {simulationScore}% of votes</label>
      <input
        type='range'
        min='0'
        max='100'
        value={simulationScore}
        onChange={e => dispatch(setSimulationScore(e.target.value))}
      />
    </div>
  );
}
