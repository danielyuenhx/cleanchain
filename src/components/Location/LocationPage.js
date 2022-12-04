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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const toast = useToast();

  const { peraWallet, algod, appIndex } = useContext(walletContext);
  const { accountAddress, setAccountAddress } = useContext(accountContext);

  const onConfirm = async () => {
    try {
      // get suggested params
      const suggestedParams = await algod.getTransactionParams().do();

      const actionTx = algod.makeApplicationNoOpTxn(
        accountAddress,
        suggestedParams,
        appIndex,
      );

      const actionTxGroup = [{txn: actionTx, signers: [accountAddress]}];

      const signedTx = await peraWallet.signTransaction([actionTxGroup]);
      console.log(signedTx);
      const { txId } = await algod.sendRawTransaction(signedTx).do();
      const result = await waitForConfirmation(algod, txId, 2);
      console.log(result)
    } catch (e) {
      console.log(e);
    }
    onClose();
    setIsConfirmed(true);
    toast({
      title: 'Bounty selected',
      description:
        'Successfully selected this bounty. Verify to claim within 30 days.',
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
        <Box h="100%" w="100%" px="16rem" py="3rem">
          <LocationInfo location={location} />
          <Divider mt="1.5rem" />
          <AcceptanceCriteria />
          <HStack ml="1rem" spacing={5} pb="5rem" mt="3rem">
            {location.isOpen && (
              <>
                {isConfirmed ? (
                  <Button colorScheme="blue" onClick={onOpen} disabled>
                    Express Interest
                  </Button>
                ) : (
                  <Button colorScheme="blue" onClick={onOpen}>
                    Express Interest
                  </Button>
                )}
                <Button colorScheme="blue" variant="outline">
                  Donate
                </Button>
              </>
            )}
          </HStack>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirmation</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                You cannot opt out of this project until the bounty has expired
                (30 days). You cannot opt in for any other projects during this
                period. Are you sure?
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onConfirm}>
                  Confirm
                </Button>
                <Button variant="ghost" onClick={onClose}>
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
