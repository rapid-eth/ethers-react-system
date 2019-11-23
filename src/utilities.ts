import { utils, ethers, Contract, ContractFactory, Signer } from 'ethers';
import { BaseProvider } from 'ethers/providers';
import { ContractJSON } from './types/contracts';

export const hashCode = function(input: string): number {
  let hash: number = 0;
  if (input.length == 0) {
    return hash;
  }
  for (var i = 0; i < input.length; i++) {
    var char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

/**
 * @desc shorten address
 * @param  {String} [address]
 * @param  {Number} [num]
 * @param  {Boolean} [showEnd = false]
 * @return {String}
 */

export function shortenAddress(
  address: string,
  num = 5,
  showEnd = false
): string {
  if (!address) return null;
  return `${address.slice(0).slice(0, num)}${
    showEnd ? `...${address.slice(0).slice(-num)}` : ''
  }`;
}
export const trimBalance = (balance: string): string => {
  if (!balance) return null;
  return balance.slice(0, 5);
};

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean} sinof
 */
export const isAddress = address => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
  }

  /* TODO: SHAD ADDRESS
    We should also SHA the addresses, but the sha_512 is not the correct one.
    And, I can't find the correct implmementation online. So if it fits, we ships! - @kamescg  */
  // return isChecksumAddress(address);
  return true;
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isChecksumAddress = function(address) {
  // Check each case
  address = address.replace('0x', '');
  var addressHash = utils.keccak256(address.toLowerCase());
  for (var i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }
  return true;
};

/**
 * @func createStringhash
 * @desc Pass string into ethers keccak256 hashing function.
 * @param {String} msg
 */
export const createStringhash = msg =>
  utils.solidityKeccak256(['string'], [msg]);

const createStringMessageSignature = msg => {
  let messageHash = utils.solidityKeccak256(['string'], [msg]);
  let messageHashBytes = utils.arrayify(messageHash);
  return messageHashBytes;
};

/**
 *
 * @returns {String} returns the ethereum address that is associated with the latest deployment of the smart contract
 */
export const getLatestDeploymentAddress = (Contract: ContractJSON): string => {
  if (Contract.networks === undefined || Contract.networks === null) {
    return '';
  }
  const networks = Object.keys(Contract.networks);
  if (networks.length <= 0) {
    return '';
  }

  const latestNetwork: string = networks[networks.length - 1];
  const latestAddress: string = Contract.networks[latestNetwork].address;
  return latestAddress;
};

/**
 * @func networkRouting
 * @desc Select network provider.
 * @return {Object} provider
 */
export const networkRouting = (network: string): BaseProvider => {
  switch (network) {
    case 'json':
      return new ethers.providers.JsonRpcProvider('http://localhost:8545');
    case 'test':
      return window.ethers.providers.test;
    case 'rinkeby':
      return ethers.getDefaultProvider('rinkeby');
    case 'infura':
      return window.ethers.providers.infura;
    case 'metamask':
      return window.web3
        ? new ethers.providers.Web3Provider(window.web3.currentProvider)
        : null;
    default:
      return null;
  }
};

/**
 *
 */
export const getContract = (
  contract: ContractJSON,
  providerName: string,
  optionalParams: { givenAddress?: string; givenID?: string }
) => {
  const { givenAddress, givenID } = optionalParams;
  const provider: BaseProvider = networkRouting(providerName);
  const { abi, bytecode, contractName } = contract;
  const address = givenAddress || getLatestDeploymentAddress(contract);

  //if the contract does not have any associated deployments
  //then it will be initialized as a factory

  if (address.length > 0) {
    const deployedContract: Contract = new Contract(address, abi, provider);
    const contractID = givenID || getContractID(deployedContract, contractName);
    return [deployedContract, contractID];
  } else {
    const contractID = givenID || `${contractName}-Factory`;
    const wallet: Signer = provider.getSigner();
    const factory: ContractFactory = new ContractFactory(abi, bytecode, wallet);
    return [factory, contractID];
  }
};

/**
 * @summary
 */
export const generateNewContracts = (
  oldContracts: Record<string, Contract>,
  wallet: Signer
) => {
  let newContracts = {};
  const keys = Object.keys(oldContracts);
  keys.forEach(id => {
    const current = oldContracts[id];
    const {
      address,
      bytecode,
      interface: { abi }
    } = current;

    if (id.includes('Factory')) {
      const factory = new ContractFactory(abi, bytecode, wallet);
      newContracts[id] = factory;
    } else {
      const contract = new Contract(address, abi, wallet);
      newContracts[id] = {
        address,
        contract
      };
    }
  });

  return newContracts;
};

/**
 *
 * @param {Contract} Contract
 * @param {*} contractName
 */
export const getContractID = (Contract: Contract, contractName: string) => {
  const shortenedAddress: string = shortenAddress(Contract.address);
  const contractID = `${contractName}-${shortenedAddress}`;

  return contractID;
};
export default {
  createStringhash,
  createStringMessageSignature,
  isAddress,
  isChecksumAddress,
  shortenAddress
};
