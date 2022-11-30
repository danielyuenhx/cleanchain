import React from 'react';
import { Button, Flex, Heading, HStack, Image } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import logo from '../logo.png';

const Navbar = () => {
  return (
    <Flex
      position="fixed"
      top={0}
      height="5rem"
      px="3rem"
      py="0.5rem"
      width="full"
      alignItems="center"
      justifyContent="space-between"
      backdropFilter="auto"
      backdropBlur="2px"
      zIndex={100}
      boxShadow="sm"
    >
      <Image src={logo} w="250px" alt="logo" px={3} py={2} />
      {/* <Heading>CleanChain</Heading> */}
      <Flex alignItems="flex-end">
        <HStack spacing={5}>
          <Button>Connect Wallet</Button>
          <ColorModeSwitcher alignSelf="flex-end" />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
