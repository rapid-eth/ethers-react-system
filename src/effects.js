import { ethers } from 'ethers';
import { isAddress, networkRouting, generateNewContracts } from './utilities';
import { SET_WALLET } from './actions/types';

const effects = (callUseEffect, state, dispatch) => {
  // /**
  //  * @function EthereumEnable
  //  */
  callUseEffect(() => {
    if (window.ethereum && !state.wallet) {
      window.ethereum.enable();
    }
  }, [state.enable]);

  /**
   * @function ProviderMonitor
   */
  callUseEffect(() => {
    if (window.web3 && window.web3.currentProvider) {
      dispatch({
        type: 'SET_PROVIDER',
        payload: {
          injected: window.web3.currentProvider,
          mainnet: ethers.getDefaultProvider(),
          rinkeby: ethers.getDefaultProvider('rinkeby')
        }
      });
    } else {
      dispatch({
        type: 'SET_PROVIDER_STATUS',
        payload: undefined
      });
    }
  }, [window.web3 && window.web3.currentProvider]);

  /**
   * @function SetAddress
   */
  callUseEffect(() => {
    const address = window.ethereum && window.ethereum.selectedAddress;
    if (address) {
      try {
        dispatch({
          type: 'SET_ADDRESS',
          input: address
        });
      } catch (error) {
        throw new Error(`An error occured while setting the address: ${error}`);
      }
    }
  }, [window.ethereum && window.ethereum.selectedAddress]);

  /**
   * @function SetWallet
   */
  callUseEffect(() => {
    if (state.address && state.wallet === undefined) {
      const runEffect = async () => {
        try {
          const provider = networkRouting('metamask');
          const wallet = provider.getSigner();
          const newContracts = generateNewContracts(state.contracts, wallet);
          dispatch({
            type: SET_WALLET,
            payload: {
              wallet,
              address: state.address,
              contracts: newContracts
            }
          });
        } catch (error) {
          throw new Error(
            `An error occurred while trying to set the wallet: ${error}`
          );
        }
      };
      runEffect();
    }
  }, [state.address]);

  /**
   * @function SignMessage
   * @description SIGN_MESSAGE_REQUEST
   */
  // callUseEffect(() => {
  //   if (
  //     state.provider &&
  //     state.wallet &&
  //     state.messages &&
  //     state.messages.length > 0
  //   ) {
  //     const runEffect = async () => {
  //       const messageRequest = state.messages[0];
  //       try {
  //         let signature;
  //         switch (messageRequest.type) {
  //           case 'SIGN_TYPED_MESSAGE_REQUEST':
  //             signature = await state.provider.injected.send(
  //               'eth_signTypedData',
  //               [messageRequest.payload, state.address]
  //             );
  //             break;
  //           default:
  //             signature = await state.wallet.signMessage(
  //               messageRequest.payload
  //             );
  //             break;
  //         }
  //         if (signature) {
  //           dispatch({
  //             type: 'SIGN_MESSAGE_SUCCESS',
  //             id: messageRequest.id,
  //             payload: messageRequest.payload,
  //             signature
  //           });
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         dispatch({
  //           type: 'SIGN_MESSAGE_FAILURE',
  //           input: {
  //             id: messageRequest.id,
  //             error
  //           }
  //         });
  //       }
  //     };
  //     runEffect();
  //   }
  // }, [state.messages, state.provider, state.wallet]);

  // /**
  //  * @function DeployContract
  //  * @description SIGN_MESSAGE_REQUEST
  //  */
  // callUseEffect(() => {
  //   if (state.store.deploy && state.store.deploy.length > 0) {
  //     const runEffect = async () => {
  //       let contract, deployed, transaction;
  //       const request = state.store.deploy[0];
  //       const { payload } = request;
  //       try {
  //         const wallet = state.wallet;
  //         if (wallet) {
  //           contract = new ethers.ContractFactory(
  //             payload.contract.abi,
  //             payload.contract.bytecode,
  //             wallet
  //           );
  //           transaction = contract.getDeployTransaction(...payload.values);
  //           deployed = await wallet.sendTransaction(transaction);
  //           dispatch({
  //             type: 'DEPLOY_CONTRACT_SUCCESS',
  //             id: request.id,
  //             delta: request.id,
  //             payload: deployed
  //           });
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     runEffect();
  //   }
  // }, [state.store.deploy]);
};

export default effects;
