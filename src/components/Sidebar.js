import React, { useState } from 'react';
import {
  Box,
  Stack,
  Input,
  InputRightElement,
  InputGroup,
  Divider,
  Heading,
  Checkbox,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSliderFilledTrack,
  RangeSliderMark,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const Sidebar = ({ onChangeSearch, onChangeSlider }) => {
  const bg = useColorModeValue('#fcfbfd', '#1b1c1f');
  const [sliderValue, setSliderValue] = useState([0, 2000]);

  return (
    <Box w="25%" h="full" bg={bg}>
      <Stack p="2rem" spacing="1rem">
        <Text fontSize="xs" color="gray.400">
          Search by name, location or type!
        </Text>
        <InputGroup mt="0.5rem !important">
          <Input placeholder="Search..." onChange={onChangeSearch} />
          <InputRightElement children={<SearchIcon color="green.500" />} />
        </InputGroup>
        <Divider />
        <Heading size="sm" textAlign="left">
          Tags
        </Heading>
        <Stack spacing={1} direction="column">
          <Checkbox colorScheme="blue" defaultChecked>
            All
          </Checkbox>
          <Checkbox colorScheme="blue">High Priority</Checkbox>
          <Checkbox colorScheme="blue">New</Checkbox>
        </Stack>
        <Divider />
        <Heading size="sm" textAlign="left" mb="2.5rem !important">
          Bounty Range
        </Heading>
        <Flex justifyContent="center">
          <RangeSlider
            aria-label={['min', 'max']}
            defaultValue={[0, 2000]}
            min={0}
            max={2000}
            step={100}
            onChange={val => {
              setSliderValue(val);
              onChangeSlider(val);
            }}
            colorScheme="blue"
            maxW="80%"
          >
            <RangeSliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
              0
            </RangeSliderMark>
            <RangeSliderMark value={1000} mt="1" ml="-2.5" fontSize="sm">
              1000
            </RangeSliderMark>
            <RangeSliderMark value={2000} mt="1" ml="-2.5" fontSize="sm">
              2000
            </RangeSliderMark>
            <RangeSliderMark
              value={sliderValue[0]}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
              borderRadius={7}
            >
              {sliderValue[0]}
            </RangeSliderMark>
            <RangeSliderMark
              value={sliderValue[1]}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
              borderRadius={7}
            >
              {sliderValue[1]}
            </RangeSliderMark>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Sidebar;
