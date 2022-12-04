import React, { useState } from 'react';
import {
  Box,
  Text,
  Stack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Heading,
  Badge,
  Button,
} from '@chakra-ui/react';
import Map from './Map';
import MoneyIcon from '../MoneyIcon';

const LocationInfo = ({ location, bounty, isClaimed }) => {
  const [position, setPosition] = useState([location.lat, location.long]);

  const onClickHandler = position => {
    setPosition(position);
  };

  return (
    <Box position="relative">
      <Tag
        size="lg"
        variant="subtle"
        right="2rem"
        position="absolute"
        top="4rem"
        colorScheme="green"
        h="1rem"
      >
        <TagLeftIcon boxSize="12px" as={MoneyIcon} />
        <TagLabel>100000 microALGOs</TagLabel>
      </Tag>
      <Stack direction="row" alignItems="center">
        <Heading size="lg" mr="2rem">
          {location.comment}
        </Heading>
        <Badge colorScheme="red" whiteSpace="wrap" textAlign="center">
          High priority
        </Badge>
        <Badge colorScheme="purple" textAlign="center" verticalAlign="center">
          New
        </Badge>
      </Stack>
      <Box mt="0.75rem" mb="0.75rem">
        {!isClaimed && <Tag textTransform="uppercase">Bounty claimed by 0xIA4X...ILRI</Tag>}
        <Text
          mt="0.5rem"
          fontSize="lg"
          color={isClaimed ? 'green.500' : 'gray.500'}
          fontWeight={700}
        >
          {isClaimed ? 'OPEN' : 'CLOSED'}
        </Text>
        <Text fontSize="md" color="gray.500">
          {location.notation}
        </Text>
        <Text fontSize="md" color="gray.500">
          {location.long}, {location.lat}
        </Text>
        <Text fontSize="md" color="gray.500">
          {location.location.road && `${location.location.road},`}{' '}
          {location.location.county && `${location.location.county},`}{' '}
          {location.location.postcode && `${location.location.postcode}`}{' '}
          {location.location.city && `${location.location.city},`}{' '}
          {location.location.state && `${location.location.state},`}{' '}
          {location.location.country && `${location.location.country}`}
        </Text>
      </Box>
      <Map position={[location.lat, location.long]} />
      <Button
        onClick={onClickHandler.bind(null, [location.lat, location.long])}
        position="absolute"
        bottom="1.5rem"
        left="2rem"
        zIndex={1000}
      >
        Recenter
      </Button>
    </Box>
  );
};

export default LocationInfo;
