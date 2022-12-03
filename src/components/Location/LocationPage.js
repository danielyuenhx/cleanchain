import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Spinner,
  Stack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Heading,
  Badge,
  useColorMode,
  useColorModeValue,
  Button,
  Divider,
} from '@chakra-ui/react';
import { getSamplePoint } from '../../api';
import Map from './Map';
import MoneyIcon from '../MoneyIcon';

const LocationPage = () => {
  const [location, setLocation] = useState('');
  const { locationId } = useParams();

  useEffect(() => {
    getSamplePoint(locationId).then(res => {
      setLocation(res.data);
    });
  }, [locationId]);

  const [position, setPosition] = useState([location.lat, location.long]);

  const onClickHandler = position => {
    setPosition(position);
  };

  const bg = useColorModeValue('#fffff', '#121316');

  return (
    <Box w="full" h="calc(100vh - 4rem)" position="relative" top="4rem" bg={bg}>
      {!location ? (
        <Flex justifyContent="center" alignItems="center" h="100%">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box h="100%" w="100%" px="16rem" py="3rem">
          <Box w="100%" position="relative">
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
              <TagLabel>{location.bounty} ALGOs</TagLabel>
            </Tag>
            <Stack direction="row" alignItems="center">
              <Heading size="lg" mr="2rem">
                {location.comment}
              </Heading>
              <Badge colorScheme="red" whiteSpace="wrap" textAlign="center">
                High priority
              </Badge>
              <Badge
                colorScheme="purple"
                textAlign="center"
                verticalAlign="center"
              >
                New
              </Badge>
            </Stack>
            <Box mt="0.75rem" mb="0.75rem">
              <Text fontSize="lg" color="green.500" fontWeight={700}>
                OPEN
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
              bottom="7rem"
              left="2rem"
              zIndex={1000}
            >
              Recenter
            </Button>
            <Divider mt="1.5rem" />
            <Box mt="1.5rem">
              <Text fontSize="2xl" fontWeight={600}>
                Acceptance Criteria
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LocationPage;
