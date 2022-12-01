import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import Location from './Location';
import river1 from '../images/river1.jpg';
import river2 from '../images/river2.jpg';
import river3 from '../images/river3.jpg';
import river4 from '../images/river4.jpeg';

const LocationList = ({ locations }) => {
  const imageList = [river1, river2, river3, river4];
  const riverList = [
    {
      image: river1,
      title: 'Shah Alam River',
      text: 'The Shah Alam River has been polluted for 2 years.',
      bounty: 50,
      position: [3.0733, 101.5185],
    },
    {
      image: river2,
      title: 'Puchong River',
      text: "The Puchong River is one of Malaysia's dirtiest rivers.",
      bounty: 100,
      position: [3.0327, 101.6188],
    },
    {
      image: river3,
      title: 'Subang River',
      text: 'Subang River has been the result of many industrial activities.',
      bounty: 75,
      position: [3.0567, 101.5851],
    },
    {
      image: river4,
      title: 'Kinta River',
      text: 'Kinta River has been polluted for 5 years.',
      bounty: 50,
      position: [4.5981, 101.0899],
    },
  ];

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
        {locations.map(location => (
          <Location
            title={location.comment}
            area={location.area.label}
            coordinates={[location.long, location.lat]}
            image={imageList[Math.floor(Math.random() * imageList.length)]}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default LocationList;
