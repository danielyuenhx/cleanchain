import React from 'react';

const accountContext = React.createContext({
  accountAddress: '',
  setAccountAddress: accountAddress => {},
});
export default accountContext;
