import React from 'react';
import { Box, Heading, Wrap, Divider } from '@chakra-ui/react';
import Location from './Location';
import river1 from '../images/river1.jpg';
import river2 from '../images/river2.jpg';
import river3 from '../images/river3.jpg';
import river4 from '../images/river4.jpeg';

const LocationList = ({ onClickHandler }) => {
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

  return (
    <Box position="relative" w="50%" mb="5rem">
      <Heading fontSize="50px" mb="1rem">
        Available bounties
      </Heading>
      <Divider />
      <Wrap spacing={5} justify="center" mt={5}>
        {riverList.map(river => (
          <Location
            image={river.image}
            title={river.title}
            text={river.text}
            bounty={river.bounty}
            position={river.position}
            onClickHandler={onClickHandler}
          />
        ))}
      </Wrap>
    </Box>
  );
};

export default LocationList;
