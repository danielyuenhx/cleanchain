import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Spinner,
  useColorModeValue,
  Divider,
  Button,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Text,
  Input,
  Stack,
} from '@chakra-ui/react';
import { getSamplePoint, closeBounty, updateBounty } from '../../api';
import LocationInfo from './LocationInfo';
import AcceptanceCriteria from './AcceptanceCriteria';

import algosdk, { waitForConfirmation } from 'algosdk';
import walletContext from '../walletContext';
import accountContext from '../accountContext';

const LocationPage = () => {
  const bg = useColorModeValue('#fffff', '#121316');

  const [location, setLocation] = useState('');
  const { locationId } = useParams();

  const [bounty, setBounty] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    getSamplePoint(locationId).then(res => {
      setLocation(res.data);
      setBounty(res.data.bounty);
      setIsClaimed(res.data.isClaimed);
      setIsConfirmed(res.data.isConfirmed);
    });
  }, [locationId]);

  // UI overlays
  const confirmActions = useDisclosure();
  const donateActions = useDisclosure();
  const toast = useToast();

  // context API
  const { peraWallet, algod, appIndex } = useContext(walletContext);
  const { accountAddress, setAccountAddress, balance, setBalance } =
    useContext(accountContext);

  const isConnectedToPeraWallet = !!accountAddress;

  const [isNgo, setIsNgo] = useState(true);

  // opt in to smart contract
  const optIn = async () => {
    try {
      // get suggested params
      const suggestedParams = await algod.getTransactionParams().do();

      const actionTx = algosdk.makeApplicationOptInTxn(
        accountAddress,
        suggestedParams,
        appIndex
      );

      const actionTxGroup = [{ txn: actionTx, signers: [accountAddress] }];

      const signedTx = await peraWallet.signTransaction([actionTxGroup]);

      const { txId } = await algod.sendRawTransaction(signedTx).do();
      const result = await waitForConfirmation(algod, txId, 2);
    } catch (e) {
      console.log(e);
    }
  };

  // confirm selection of project
  const onConfirm = async (action) => {
    try {
      if (action === 'select') {
        confirmActions.onClose();
        setIsConfirmed(true);
      }

      // get suggested params
      const suggestedParams = await algod.getTransactionParams().do();

      await optIn();

      const actionTx = algosdk.makeApplicationCallTxnFromObject({
        appIndex,
        from: accountAddress,
        appArgs: [new Uint8Array(Buffer.from(action))],
        suggestedParams,
      });

      const actionTxGroup = [{ txn: actionTx, signers: [accountAddress] }];

      const signedTx = await peraWallet.signTransaction([actionTxGroup]);

      const { txId } = await algod.sendRawTransaction(signedTx).do();
      const result = await waitForConfirmation(algod, txId, 2);

      if (action === 'select') {
        toast({
          title: 'Project selected',
          description:
            'Successfully selected this project. Verify to claim within 30 days.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Project deselected',
          description:
            'Successfully deselected this project.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }

    } catch (e) {
      console.log(e);
      if (action === 'select') {
        toast({
          title: 'Transaction Failed',
          description: 'Already expressed interest for this project.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setIsConfirmed(false);
      } else {
        toast({
          title: 'Transaction Failed',
          description: 'Could not unselect this project. Try selecting it first.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const [donation, setDonation] = useState(0);

  const onDonate = async () => {
    try {
      donateActions.onClose();
      // get suggested params
      const suggestedParams = await algod.getTransactionParams().do();

      await optIn();

      let callTransaction = algosdk.makeApplicationCallTxnFromObject({
        appIndex,
        from: accountAddress,
        appArgs: [new Uint8Array(Buffer.from('donate'))],
        suggestedParams,
      });

      // pay to hardcoded wallet
      let payTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        amount: algosdk.algosToMicroalgos(parseInt(donation)),
        to: 'UHSC3NR7QNHQJTGQY44RQYMD47XLO7KH5DNK64JRVOBL4DQ5X2C6FNMMII',
        from: accountAddress,
        suggestedParams,
      });

      let txgroup = algosdk.assignGroupID([callTransaction, payTransaction]);

      const multipleTxnGroup = [
        { txn: callTransaction, signers: [accountAddress] },
        { txn: payTransaction, signers: [accountAddress] },
      ];
      const signedTxns = await peraWallet.signTransaction([multipleTxnGroup]);

      let tx = await algod.sendRawTransaction(signedTxns).do();
      const result = await algosdk.waitForConfirmation(algod, tx.txId, 2);

      setBalance(balance - parseInt(donation));

      await updateBounty(locationId, bounty + parseInt(donation));
      setBounty(bounty + parseInt(donation));

      toast({
        title: 'Donation successful!',
        description:
          'Successfully donated ' +
          parseInt(donation) +
          ' ALGOs to 0xUHSC...MMII',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Transaction Failed',
        description: 'Something went wrong.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setIsConfirmed(false);
    }
  };

  // on claim of bounty
  const onClaim = async () => {
    try {
      const suggestedParams = await algod.getTransactionParams().do();

      await optIn();

      const actionTx = algosdk.makeApplicationCallTxnFromObject({
        appIndex,
        from: accountAddress,
        appArgs: [
          new Uint8Array(Buffer.from('claim')),
          new Uint8Array(Buffer.from('40')),
        ],
        suggestedParams,
      });

      const actionTxGroup = [{ txn: actionTx, signers: [accountAddress] }];

      const signedTx = await peraWallet.signTransaction([actionTxGroup]);

      const { txId } = await algod.sendRawTransaction(signedTx).do();
      const result = await waitForConfirmation(algod, txId, 2);

      await closeBounty(locationId);
      setIsClaimed(true);

      toast({
        title: 'Bounty claimed!',
        description:
          'Successfully claimed the bounty for this project. Thank you for your contribution!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Claim failed!',
        description:
          'Ensure you are the claimant and that the cleanliness threshold has been met.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setIsConfirmed(false);
    }
  };

  // send a verification request
  const onSend = () => {
    confirmActions.onClose();

    toast({
      title: 'Verification request sent!',
      description: 'Successfully sent a verification request.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const onVerify = () => {
    setIsNgo(!isNgo);
  };

  return (
    <Box
      w="full"
      h="calc(100vh - 4rem)"
      position="relative"
      top="4rem"
      bg={bg}
      overflowY="scroll"
    >
      {!location ? (
        <Flex justifyContent="center" alignItems="center" h="100%">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box
          h="100%"
          w="100%"
          px={['4rem', '4rem', '4rem', '4rem', '16rem']}
          py="3rem"
        >
          <LocationInfo location={location} bounty={bounty} />
          <Divider mt="1.5rem" />
          <AcceptanceCriteria />
          <Flex ml="1rem" pb="5rem" mt="3rem" justifyContent="space-between">
            {!location.isClaimed && isConnectedToPeraWallet ? (
              <>
                <HStack spacing={5}>
                  {isConfirmed ? (
                    <Button
                      colorScheme="blue"
                      onClick={confirmActions.onOpen}
                      disabled
                    >
                      Express Interest
                    </Button>
                  ) : (
                    <Button colorScheme="blue" onClick={confirmActions.onOpen}>
                      Express Interest
                    </Button>
                  )}
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={donateActions.onOpen}
                  >
                    Donate
                  </Button>
                </HStack>
                {isNgo && (
                  <Button right={0} colorScheme="green" onClick={onClaim}>
                    Claim
                  </Button>
                )}
              </>
            ) : (
              <></>
            )}
          </Flex>
          <Divider />
          <Text ml="1rem" mt="1rem">
            For the purpose of this demonstration, administrator commands can be
            found below to verify the current wallet and deselect the project.
          </Text>
          <HStack spacing={5} ml="1rem" pb="5rem" mt="1rem">
            <Button colorScheme="green" onClick={onVerify}>
              {isNgo ? "Unverify wallet" : "Verify wallet"}
            </Button>
            <Button colorScheme="green" onClick={onConfirm.bind(null, 'deselect')}>
              Deselect project
            </Button>
          </HStack>
          <Modal
            isOpen={confirmActions.isOpen}
            onClose={confirmActions.onClose}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {isNgo ? 'Confirmation' : 'Verification'}
              </ModalHeader>
              <ModalCloseButton />
              {isNgo ? (
                <>
                  <ModalBody>
                    You cannot opt out of this project until the bounty has
                    expired (30 days). You cannot opt in for any other projects
                    during this period. Are you sure?
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onConfirm.bind(null, 'select')}>
                      Confirm
                    </Button>
                    <Button variant="ghost" onClick={confirmActions.onClose}>
                      Close
                    </Button>
                  </ModalFooter>{' '}
                </>
              ) : (
                <>
                  <ModalBody>
                    To opt in, your wallet has to be verified as an NGO. Fill in
                    your details below and we will get back to you within 48
                    hours:
                    <Stack spacing={3} mt="1rem">
                      <Input placeholder="Name" />
                      <Input placeholder="Email" />
                      <Input placeholder="NGO name" />
                      <Input placeholder="Website (optional)" />
                    </Stack>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onSend}>
                      Send
                    </Button>
                  </ModalFooter>{' '}
                </>
              )}
            </ModalContent>
          </Modal>
          <Modal
            isOpen={donateActions.isOpen}
            onClose={donateActions.onClose}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Donate</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <NumberInput
                  defaultValue={0}
                  onChange={donationValue => setDonation(donationValue)}
                  max={balance}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onDonate}>
                  Confirm
                </Button>
                <Button variant="ghost" onClick={donateActions.onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

export default LocationPage;
