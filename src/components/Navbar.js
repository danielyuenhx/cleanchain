import React from 'react';
import { Button, Flex, Heading, HStack, Image, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import logo from '../logo2.png';

const Navbar = () => {
  const bg = useColorModeValue('#fcfbfd', '#1b1c1f')

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
      <Image src={logo} w="200px" alt="logo" px={3} py={2} />
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
