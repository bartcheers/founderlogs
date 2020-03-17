import React from 'react';
import './App.scss';
import Log from './components/Log/Log';
import Header from './components/Header/Header';
import Simulation from './components/Simulation/Simulation';
import Menu from './components/Menu/Menu';
import Vote from './components/Vote/Vote';
import { useSelector } from 'react-redux';

function App() {
  const activeView = useSelector(state => state.menuActiveView);

  return (
    <div className='App'>
      <Header />
      <main className='wrap'>
        <Menu />
        {activeView === 0 ? <Log /> : <Vote />}
        {activeView === 0 ? <Simulation /> : null}
      </main>
    </div>
  );
}

export default App;
