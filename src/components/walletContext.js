import React from 'react';

const walletContext = React.createContext({
  peraWallet: '',
  algod: '',
  appIndex: '',
});
export default walletContext;
