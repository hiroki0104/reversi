import React from 'react';
import './App.css';
import Board from './Board';
import Reversi from './Reversi';

function App() {
  return (
    <div className='App'>
      <h1>オセロ!!</h1>
      <Reversi />
    </div>
  );
}

export default App;
