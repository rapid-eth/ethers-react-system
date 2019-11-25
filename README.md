# Ethers React System

## Warning: this repo is experimental, unstable, unsupported, and might break at any time. You've been warned.

[![build and publish (GitHub)](<https://github.com/rapid-eth/ethers-react-system/workflows/Build%20and%20Publish%20(GitHub)/badge.svg>)](<https://github.com/rapid-eth/ethers-react-system/workflows/Build%20and%20Publish%20(GitHub)/badge.svg>)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```js
npm install ethers-react-system
```

## Example

```js
import { EthersProvider } from 'ethers-react-system';

<App>
  <EthersProvider>...</EthersProvider>
</App>;
```

The package pairs with the `3box-system` library. The design system library hooks into the state system to help manage user logins, connecting to spaces, posting to threads, etc....

Add Linting back to package.json
"lint": "xo && remark . -qfo",

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Getting Started](#getting-started)
- [Initialize Contracts](#initializing-contracts)
- [Wallet Generation](#wallet-generation)
- [Deploy Contracts](#deploy-contracts)
- [Send Transaction](#send-transaction)
- [Sign Message](#sign-message)
- [Sign Typed Message](#sign-typed-message)
- [Message Decryption and Encryption](#message-decryption-and-encryption)
- [Contributors](#contributors)
- [License](#license)

## Install

### [npm]

```sh
npm install ethers-react-system
```

### [yarn][]

```sh
yarn add ethers-react-system
```

## Getting Started

```js
import { EthersProvider, EthersConsumer } from 'ethers-react-system';

const App = () => {
  return (
    <EthersProvider>
      <WrappedApp />
    </EthersProvider>
  );
};

const WrappedApp = () => {
  return (
    <EthersConsumer>
      {ethers => {
        return <h1>There are {ethers.deployed.length} deployed.</h1>;
      }}
    </EthersConsumer>
  );
};

export default App;
// script
```

## Initializing Contracts

There are two major ways of initializing contracts. Either through the action creator or by passing it to the top-level provider.

### Via Actions Creator

```js
ethers.initContract(Contract[,deployedAddress]);
// script
```

the function requires the contract address and ABI and has additional optional requirements.

```js
import React from 'react';
import { withEthers } from 'ethers-react-system';
import TestContract from './build/TestContract.json';
// you can optionally pass the deployedAddress but by default
// it will be initialized to the latest deployment address
const deployedAddress = '0x...';

class WrappedApp extends React.Component {
  constructor(props) {
    super(props);
    const { ethers } = props;
    ethers.initContract(TestContract);
  }
  render() {
    const { ethers } = this.props;
    const contracts = Object.keys(ethers.contracts);
    return <h1>There are {contracts.length} initialized</h1>;
  }
}

export default withEthers(WrappedApp);
// script
```

### Via Ethers Provider

```js
import React from 'react';
import { EthersProvider } from 'ethers-react-system';
import WrappedApp from './WrappedApp';
import TestContract from './build/TestContract.json';

const App = () => {
  return (
    <EthersProvider contracts={[TestContract]}>
      <WrappedApp />
    </EthersProvider>
  );
};

export default App;
// script
```

## Wallet Generation

Although the provider defaults to utilizing the Ethereum provider (either via Metamask or a dApp browser).
It is possible to generate a burner wallet that can be utilized in the absence of Metamask or dApp browser.

The following action creator will generate a wallet with the set provider(defaulting the JSON if none). It will set the wallet and address property of the ethers state object.

```js
ethers.generateWallet();
// script
```

```js
import React from 'react';
import { withEthers } from 'ethers-provider';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { ethers } = props;
    ethers.generateWallet();
  }

  render() {
    const { ethers } = this.props;
    return <h1>The address is {ethers.address}</h1>;
  }
}

export default withEthers(Home);
// script
```

## Deploy Contracts

Deploy Contracts Functionality WIP. Once the fucntionality is implemented and tested the documentation will be added.

## Send Transaction

The ether object contains a sendTransaction function that can be used to interfact with a smart contract. The contractID and functionName to interfact with must be provided as well as an array of the parameters of the given function.

```js
ethers.sendTransaction(contractID, functionName, params);
//script
```

The action creator will sign and send the transaction to the network currently connected to.

### <p style="color:orange">Warning</p>

Presently there are **known** issues with error handling with send transactions. This error causes transactions to fail silently. Until the issue is solved directly utilize the initiated contracts to send transactions.

## Sign Message

Message Signing Functionality WIP. Once the fucntionality is implemented and tested the documentation will be added.

## Sign Typed Message

Typed Message Signing (ERC712) Functionality WIP. Once the fucntionality is implemented and tested the documentation will be added.

## Message Decryption and Encryption

Message Decryption/Encryption WIP. Once the fucntionality is implemented and tested the documentation will be added.

## Contributors

| Name      | Website                    |
| --------- | -------------------------- |
| **Kames** | <https://www.kamescg.com>  |
| **Luis**  | <https://www.luisosta.com> |

## License

[MIT](LICENSE) © [Kames](https://www.kamescg.com)

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
