import React, { useContext, useReducer, useEffect } from 'react';
import Context from './Context';
import reducers from '../reducers/reducer';
import ProviderEffects from '../effects';
import { enhanceActions } from '../middleware/actions';
import { initialize } from '../middleware/initialize';
/**
 * @summary A React Context Provider that provides a simple interface to most ethers.js functionality.
 * It allows for easy contract management and querying/transactions of the smart contracts.
 * @param {Array<React.Component>} children
 * @param {Array} contracts
 * @param {String} provider
 * @todo Add hooks to query smart contracts
 * @todo Add better error handling
 * @todo Find better way to automatically set the address and wallet
 */
console.warn(
  'EthersProvider is not ready for production. Use at your discretion'
);
const Provider = ({ children, contracts = [], provider = 'metamask' }) => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(
    reducers,
    initialState,
    initialize(contracts, provider)
  );

  const hey = 'his';
  const actions = enhanceActions(state, dispatch);
  ProviderEffects(useEffect, state, dispatch);
  return (
    <Context.Provider
      value={{
        ...state,
        dispatch,
        defaultProvider: provider,
        enable: window.ethereum ? window.ethereum.enable : state.enable,
        ...actions
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
