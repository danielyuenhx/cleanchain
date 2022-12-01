import React from 'react';
import {
  Box,
  Stack,
  Input,
  InputRightElement,
  InputGroup,
  Divider,
  Heading,
  Checkbox,
  useColorModeValue
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const Sidebar = ({ onChange }) => {
  const bg = useColorModeValue('#fcfbfd', '#1b1c1f');

  return (
    <Box w="20%" h="full" bg={bg}>
      <Stack p="2rem" spacing="1rem">
        <InputGroup>
          <Input placeholder="Search..." onChange={onChange} />
          <InputRightElement children={<SearchIcon color="green.500" />} />
        </InputGroup>
        <Divider />
        <Heading size="sm" textAlign="left">
          Tags
        </Heading>
        <Stack spacing={1} direction="column">
          <Checkbox colorScheme="gray">High Priority</Checkbox>
          <Checkbox colorScheme="gray">New</Checkbox>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
