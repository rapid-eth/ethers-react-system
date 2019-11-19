import { hashCode } from '../utilities';
import {
  SET_PROVIDER,
  SET_PROVIDER_STATUS,
  SIGN_TYPED_MESSAGE,
  SIGN_MESSAGE,
  INIT_CONTRACT,
  DEPLOY_CONTRACT,
  DEPLOY_CONTRACT_FROM_BYTECODE_REQUEST,
  SET_WALLET,
  SEND_TRANSACTION,
  SET_ADDRESS
} from '../actions/types';

const reducerActions = (state, action) => {
  const { input, delta, id, payload, type } = action;
  switch (type) {
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
    case SET_ADDRESS:
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
    case SEND_TRANSACTION:
      return {
        ...state,
        signatures: {
          ...state.signatures,
          [id]: payload
        }
      };
    case SIGN_TYPED_MESSAGE:
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
