import test from 'ava';
import {
  getContractID,
  networkRouting,
  shortenAddress,
  getContract,
  getLatestDeploymentAddress
} from '../dist/utilities';
import { ethers, utils } from 'ethers';
import StorageDeployed from './data/StorageDeployed.json';

test('shortenAddress should return a shortened address', t => {
  const randomWallet = ethers.Wallet.createRandom();
  const address = randomWallet.address;
  const shortened = shortenAddress(address, 5, false);
  t.assert(address.includes(shortened));
});

test('getLatestDeploymentAddress should return the latest deployment address', t => {
  const correctAddress = '0xa24db47fEb52ba65BA9a1956597E0140B52ee8b0';

  const address = getLatestDeploymentAddress(StorageDeployed);
  t.is(address, correctAddress);
});

test('getContractID should return a unique ID when provided a contract', t => {
  const address = getLatestDeploymentAddress(StorageDeployed);
  const { abi, contractName } = StorageDeployed;
  const provider = ethers.getDefaultProvider();
  const contract = new ethers.Contract(address, abi, provider);
  const contractID = getContractID(contract, contractName);
  t.assert(contractID.length > contractName.length);
  t.assert(contractID.includes(contractName));
});
