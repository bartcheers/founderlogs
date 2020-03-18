import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSimulationScore,
  setSimulationBuyIn,
  setSimulationMultiplier,
} from '../../actions/simulationActions.js';
import './simulation.scss';

export default function Simulation() {
  const score = useSelector(state => state.simulation.score);
  const buyIn = useSelector(state => state.simulation.buyIn);
  const multiplier = useSelector(state => state.simulation.multiplier);
  const dispatch = useDispatch();

  return (
    <div className='simulation modal'>
      <h2>Simulation</h2>
      <p>Find out what your pay out will be, based on last week's data.</p>
      <label>Buy in: ${buyIn * 10}</label>
      <input
        type='range'
        min='0'
        max='10'
        value={buyIn}
        onChange={e => dispatch(setSimulationBuyIn(e.target.value))}
      />
      <label>Multiplier: {multiplier}x</label>
      <input
        type='range'
        min='1'
        max='100'
        value={multiplier}
        onChange={e => dispatch(setSimulationMultiplier(e.target.value))}
      />
      <label>Score: {score}% of votes</label>
      <input
        type='range'
        min='0'
        max='100'
        value={score}
        onChange={e => dispatch(setSimulationScore(e.target.value))}
      />
      <div className='pay-out'>Pay out: $48</div>
    </div>
  );
}
