import React from 'react';
import Context from './Context';

/**
 * @summary A higher order component which returns the given React Component with the ethers object as a prop.
 * @param {React.Component} Component the child component of the HOC. It will have the ethers state object as a prop
 * @returns {React.Component} returns the new React component created by the HOC
 */
const withEthers = Component => () => (
  <Context.Consumer>
    {ethers => <Component ethers={ethers}></Component>}
  </Context.Consumer>
);

export default withEthers;
