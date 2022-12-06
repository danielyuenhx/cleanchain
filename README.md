# Cleanchain-Frontend 
![CleanChain](src/logo.png)

This repository contains the frontend web application written for the CleanChain Application, developed for ACE-SIP Blockchain Hackathon. Currently, this repository only contains code for demonstration purposes.

## Setup:

Change to the project directory and install the required packages by running:

`
npm i
`

Once complete, you can run:

`npm start`

Which runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Getting Started:

To access features such as donating, selecting a project and claiming bounties you would need to connect your [Pera Wallet](https://perawallet.app/) to CleanChain by scanning the QR code provided using Pera Algo Wallet. 

### Donating

All wallet holders are able to donate to a project. Donations are in the form of microALGOs, which will be pooled in the respective smart contract for the chosen project as a monetary incentive. Upon completion, funds from the pool are disbursed to the claimant.

### Selecting a project

Wallet holders can verify themselves as NGOs by submitting a verification request. Once approved, verfified wallet holders are able to select a project by expressing interest in a project. Upon confirmation, NGOs are not allowed to select a different project until the selection has expired (30 days). These wallet holders are the claimant of the bounty once the project is completed.

### Claiming bounties

Upon completion of a project, verified wallet holders are able to claim the bounty which is verified by the smart contract. Funds are disbursed to the claimant. 
PS: Currently, the smart contract will always approve claims to the bounty as long as you are signed in as the claimant.


## Linking with [CleanChain-Backend](https://github.com/danielyuenhx/cleanchain-backend):

Run data fetching API in the backend by using:

`python server.py`

Make note of the App ID of your smart contract app and enter it in the `appIndex` variable within the App.js file of the React app. Follow the instructions listed to access the Algorand testnet.
