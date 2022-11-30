import React from 'react'
import { Button, Flex, Heading, HStack } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Navbar = () => {
  return (
    <Flex
      position="fixed"
      top={0}
      px="2rem"
      py="0.75rem"
      width="full"
      alignItems="flex-end"
      justifyContent="space-between"
      backdropFilter="auto" 
      backdropBlur="1px"
      zIndex={100}
    >
      <Heading>CleanChain</Heading>
      <Flex
        alignItems="flex-end"
      >
        <HStack spacing={5}>
          <Button>Connect Wallet</Button>
          <ColorModeSwitcher alignSelf="flex-end" />
        </HStack>
      </Flex>
    </Flex>
  )
}

export default Navbar