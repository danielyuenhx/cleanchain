import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  Divider,
  Flex,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import Location from './Location';
import river1 from '../../images/river1.jpg';
import river2 from '../../images/river2.jpg';
import river3 from '../../images/river3.jpg';
import river4 from '../../images/river4.jpeg';

const LocationList = ({ locations }) => {
  const imageList = [river1, river2, river3, river4];
  const bg = useColorModeValue('#f5f4f6', '#121316');

  return (
    <Box
      px="3rem"
      py="1.5rem"
      w="100%"
      bg={bg}
      overflowX="hidden"
      overflowY="scroll"
    >
      <Stack>
        <Heading size="lg" mb="1rem">
          Available Bounties
        </Heading>
        {!locations.length ? (
          <Flex justifyContent="center" alignItems="center">
            <Spinner size="xl" color="blue.500" mt="16rem" />
          </Flex>
        ) : (
          locations.map(location => (
            <Location
              key={location.comment}
              id={location.notation}
              title={location.comment}
              area={location.area.label}
              type={location.samplingPointType.label}
              coordinates={[location.long, location.lat]}
              bounty={location.bounty}
              isOpen={location.isClaimed}
              image={imageList[Math.floor(Math.random() * imageList.length)]}
            />
          ))
        )}
      </Stack>
    </Box>
  );
};

export default LocationList;
