import React from 'react';
import { withEthers } from 'ethers-react-system';
import logo from './logo.svg';
import './App.css';

function App({ ethers }) {
  console.log('Ethers: ', ethers);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withEthers(App);
