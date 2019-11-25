// * Set Actions
export const SET_PROVIDER: string = 'SET_PROVIDER';
export const SET_PROVIDER_STATUS: string = 'SET_PROVIDER_STATUS';

// * Init actions
export const INIT_CONTRACT: string = 'INIT_CONTRACT';

// * Deploy actions
export const DEPLOY_CONTRACT: string = 'DEPLOY_CONTRACT';

// * Sign actions
export const SIGN_TYPED_MESSAGE: string = 'SIGN_TYPED_MESSAGE';
export const SIGN_MESSAGE: string = 'SIGN_MESSAGE';
export const SEND_TRANSACTION: string = 'SEND_TRANSACTION';

// * Wallet
export const SET_WALLET: string = 'SET_WALLET';
export const SET_ADDRESS: string = 'SET_ADDRESS';

interface Action {
  readonly type: ActionType;
  readonly id?: string;
  readonly payload: Object;
}

enum ActionType {
  SET_PROVIDER = 'SET_PROVIDER',
  SET_PROVIDER_STATUS = 'SET_PROVIDER_STATUS',
  INIT_CONTRACT = 'INIT_CONTRACT',
  DEPLOY_CONTRACT = 'DEPLOY_CONTRACT',
  SIGN_TYPED_MESSAGE = 'SIGN_TYPED_MESSAGE',
  SIGN_MESSAGE = 'SIGN_MESSAGE',
  SEND_TRANSACTION = 'SEND_TRANSACTION',
  SET_WALLET = 'SET_WALLET',
  SET_ADDRESS = 'SET_ADDRESS'
}

export { Action, ActionType };
