import dot from 'dot-prop-immutable-chain';
import { hashCode } from './utilities';
import {
  SET_PROVIDER,
  SET_PROVIDER_STATUS,
  SIGN_TYPED_MESSAGE_REQUEST,
  SIGN_MESSAGE,
  INIT_CONTRACT,
  DEPLOY_CONTRACT,
  DEPLOY_CONTRACT_FROM_BYTECODE_REQUEST,
  LOAD_CONTRACT_INTO_LIBRARY_REQUEST,
  SET_WALLET,
  SIGN_TRANSACTION
} from './actions/types';

const reducerActions = (state, action) => {
  let filtered;
  const { input, delta, id, payload, type } = action;
  switch (action.type) {
    case SET_PROVIDER:
      return {
        ...state,
        provider: payload
      };
    case SET_PROVIDER_STATUS:
      return {
        ...state,
        providerStatus: payload
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: input
      };
    case SET_WALLET:
      return {
        ...state,
        address: payload.address,
        wallet: payload.wallet,
        contracts: payload.contracts
      };
    case SIGN_TRANSACTION:
      return {
        ...state,
        signatures: {
          ...state.signatures,
          [id]: payload
        }
      };
    case SIGN_TYPED_MESSAGE_REQUEST:
      return {
        ...state,
        store: {
          ...state.store,
          messages: [
            ...state.store.messages,
            {
              ...action
            }
          ]
        }
      };
    case SIGN_MESSAGE:
      return {
        ...state,
        messages: {
          [id]: payload
        }
      };

    /* ----------------------- */
    /* Contract Loading     */
    /* ----------------------- */
    case LOAD_CONTRACT_INTO_LIBRARY_REQUEST:
      return dot(state)
        .set(`store.library`, [...state.store.library, action])
        .value();

    case 'LOAD_CONTRACT_INTO_LIBRARY_SUCCESS':
      return dot(state)
        .set(`library.${action.payload.contractName}`, action.payload)
        .value();

    case 'LOAD_CONTRACT_INTO_LIBRARY_FAILURE':
      return dot(state)
        .set(`store.library`, [])
        .value();
    /* ----------------------- */
    /* Contract Loading     */
    /* ----------------------- */
    case 'LOAD_CONTRACT_REQUEST':
      return dot(state)
        .set(`store.library`, [...state.store.contracts, action])
        .value();

    case 'LOAD_CONTRACT_SUCCESS':
      return dot(state)
        .set(`contracts.${action.payload.contractName}`, action.payload)
        .value();

    case 'LOAD_CONTRACT_FAILURE':
      return dot(state)
        .set(`store.contracts`, [])
        .value();
    /* ----------------------- */
    /* Contract Initialize     */
    /* ----------------------- */

    case INIT_CONTRACT:
      const { address, contract } = payload;
      return {
        ...state,
        store: {
          ...state.store,
          contracts: []
        },
        contracts: {
          ...state.contracts,
          [id]: {
            id,
            address,
            ...contract
          }
        }
      };

    /* ----------------------- */
    /* Contract Deployment     */
    /* ----------------------- */
    case DEPLOY_CONTRACT:
      return {
        ...state,
        contracts: {
          ...state.contracts,
          [id]: payload.contract
        }
      };
    case DEPLOY_CONTRACT_FROM_BYTECODE_REQUEST:
      return {
        ...state,
        store: {
          ...state.store,
          deploy: [
            ...state.store.deploy,
            {
              payload,
              id: delta || hashCode(input)
            }
          ]
        }
      };

    default:
      throw new Error(`No Reducer Type Set: ${action.type}`);
  }
};

export default reducerActions;
