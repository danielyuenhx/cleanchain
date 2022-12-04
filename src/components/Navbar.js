import React, { useContext } from 'react';
import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  useColorModeValue,
  useToast,
  Tag,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import logo from '../logo2.png';
import { Link } from 'react-router-dom';

import walletContext from './walletContext';
import accountContext from './accountContext';

const Navbar = () => {
  const bg = useColorModeValue('#fcfbfd', '#1b1c1f');

  const { peraWallet, algod } = useContext(walletContext);
  const { accountAddress, setAccountAddress } = useContext(accountContext);

  const isConnectedToPeraWallet = !!accountAddress;

  const toast = useToast();

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress(null);
    const id = 'disconnect_toast';

    if (!toast.isActive(id)) {
      toast({
        id,
        title: 'Wallet disconnected',
        description: 'Your wallet has been disconnected from CleanChain.',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
    }
  }

  const handleConnectWalletClick = () => {
    peraWallet.connect().then(newAccounts => {
      // setup the disconnect event listener
      peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);
      setAccountAddress(newAccounts[0]);

      toast({
        title: 'Wallet connected!',
        description: "We've connected your wallet to CleanChain.",
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex
      position="fixed"
      top={0}
      height="4rem"
      px="1rem"
      width="full"
      alignItems="center"
      justifyContent="space-between"
      zIndex={100}
      bg={bg}
    >
      <Link to="/">
        <Image src={logo} w="200px" alt="logo" px={3} py={2} />
      </Link>
      <Flex alignItems="flex-end">
        <HStack spacing={5}>
          {isConnectedToPeraWallet && (
            <Tag>
              0x{accountAddress.substring(0, 4)}...
              {accountAddress.substring(accountAddress.length - 4)}
            </Tag>
          )}
          <Button
            onClick={
              isConnectedToPeraWallet
                ? handleDisconnectWalletClick
                : handleConnectWalletClick
            }
          >
            {isConnectedToPeraWallet ? 'Disconnect' : 'Connect to Pera Wallet'}
          </Button>
          <ColorModeSwitcher alignSelf="flex-end" />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
