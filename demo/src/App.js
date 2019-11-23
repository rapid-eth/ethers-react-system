import React from 'react';
import { withEthers } from 'ethers-react-system';
import Storage from './ethereum/contracts/Storage.json';
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
        <button onClick={handleClick(ethers)}>Deploy Storage Contract</button>
      </header>
    </div>
  );
}

const handleClick = ethers => () => {
  ethers.deployContract('Storage-Factory');
};

export default withEthers(App);
