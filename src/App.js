import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk, { waitForConfirmation } from 'algosdk';

import Navbar from './components/Navbar';
import HomePage from './components/Home/HomePage';
import LocationPage from './components/Location/LocationPage';

import walletContext from './components/walletContext';
import accountContext from './components/accountContext';

// Create the PeraWalletConnect instance outside the component
const peraWallet = new PeraWalletConnect();

// The app ID on testnet
// const appIndex = ;

// connect to the algorand node
const algod = new algosdk.Algodv2(
  '',
  'https://testnet-api.algonode.cloud',
  443
);

function App() {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress(null);
  }

  // const checkCounterState = async () => {
  //   try {
  //     const counter = await algod.getApplicationByID(appIndex).do();
  //     if (!!counter.params['global-state'][0].value.uint) {
  //       setCurrentCount(counter.params['global-state'][0].value.uint);
  //     } else {
  //       setCurrentCount(0);
  //     }
  //   } catch (e) {
  //     console.error('There was an error connecting to the algorand node: ', e);
  //   }
  // };

  useEffect(() => {
    // reconnect to session when the component is mounted
    peraWallet.reconnectSession().then(accounts => {
      // Setup disconnect event listener
      peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);

      if (accounts.length) {
        setAccountAddress(accounts[0]);
      }
    });
  }, []);

  return (
    <walletContext.Provider value={{ peraWallet, algod }}>
      <accountContext.Provider value={{ accountAddress, setAccountAddress }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:locationId" element={<LocationPage />} />
          </Routes>
        </BrowserRouter>
      </accountContext.Provider>
    </walletContext.Provider>
  );
}

export default App;
