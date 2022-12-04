import React from 'react';

const accountContext = React.createContext({
  accountAddress: '',
  setAccountAddress: accountAddress => {},
  balance: 0,
  setBalance: balance => {},
});
export default accountContext;
