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
import { getSamplePoint } from '../../api';
import LocationInfo from './LocationInfo';
import AcceptanceCriteria from './AcceptanceCriteria';

import algosdk, { waitForConfirmation } from 'algosdk';
import walletContext from '../walletContext';
import accountContext from '../accountContext';

const LocationPage = () => {
  const [location, setLocation] = useState('');
  const { locationId } = useParams();

  useEffect(() => {
    getSamplePoint(locationId).then(res => {
      setLocation(res.data);
    });
  }, [locationId]);

  const bg = useColorModeValue('#fffff', '#121316');

  const confirmActions = useDisclosure();
  const donateActions = useDisclosure();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const toast = useToast();
  const [isClaimed, setIsClaimed] = useState(false);

  const { peraWallet, algod, appIndex } = useContext(walletContext);
  const { accountAddress, setAccountAddress, balance, setBalance } =
    useContext(accountContext);

  const isConnectedToPeraWallet = !!accountAddress;

  const [isNgo, setIsNgo] = useState(false);
  const [bounty, setBounty] = useState(0);

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

  const onConfirm = async () => {
    try {
      confirmActions.onClose();
      setIsConfirmed(true);
      // get suggested params
      const suggestedParams = await algod.getTransactionParams().do();

      await optIn();

      const actionTx = algosdk.makeApplicationCallTxnFromObject({
        appIndex,
        from: accountAddress,
        appArgs: [new Uint8Array(Buffer.from('select'))],
        suggestedParams,
      });

      const actionTxGroup = [{ txn: actionTx, signers: [accountAddress] }];

      const signedTx = await peraWallet.signTransaction([actionTxGroup]);

      const { txId } = await algod.sendRawTransaction(signedTx).do();
      const result = await waitForConfirmation(algod, txId, 2);
      console.log(result);

      toast({
        title: 'Project selected',
        description:
          'Successfully selected this project. Verify to claim within 30 days.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Transaction Failed',
        description: 'Already expressed interest for this project.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setIsConfirmed(false);
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

      let payTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        amount: parseInt(donation),
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
      setBounty(bounty + parseInt(donation));

      toast({
        title: 'Donation successful!',
        description:
          'Successfully donated ' + donation + ' microALGOs to 0xUHSC...MMII',
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
          <LocationInfo
            location={location}
            bounty={bounty}
            isClaimed={isClaimed}
          />
          <Divider mt="1.5rem" />
          <AcceptanceCriteria />
          <Flex ml="1rem" pb="5rem" mt="3rem" justifyContent="space-between">
            {location.isOpen && isConnectedToPeraWallet ? (
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
                <Button right={0} colorScheme="green" onClick={onClaim}>
                  Claim
                </Button>
              </>
            ) : (
              <></>
            )}
          </Flex>
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
                    <Button colorScheme="blue" mr={3} onClick={onConfirm}>
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
