import React from 'react';
import {
  Card,
  Image,
  Stack,
  CardBody,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import MoneyIcon from './MoneyIcon';
import Map from './Map';

const Location = ({ title, area, text, bounty, coordinates, image }) => {
  const bg = useColorModeValue('#fcfbfd', '#1b1c1f');

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      bg={bg}
    >
      {/* <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={image}
      /> */}
      <Map position={[coordinates[1], coordinates[0]]} />
      <Stack>
        <CardBody>
          <Tag
            size="lg"
            variant="subtle"
            right="2rem"
            position="absolute"
            margin="auto 0"
            top={0}
            bottom={0}
            colorScheme="green"
            h="1rem"
          >
            <TagLeftIcon boxSize="12px" as={MoneyIcon} />
            <TagLabel>{Math.floor(Math.random() * 1000)} ALGOs</TagLabel>
          </Tag>

          <Stack direction="row" alignItems="center">
            <Text fontSize="md" fontWeight={700}>
              {title}
            </Text>
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

          <Text fontSize="sm" color="gray.500">
            {area}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {coordinates[0]}, {coordinates[1]}
          </Text>
        </CardBody>

        {/* <CardFooter>
          <Tag size="lg" variant="subtle" bottom={0} marginBottom="1rem !important" position="absolute">
            <TagLeftIcon boxSize="12px" as={MoneyIcon} />
            <TagLabel>{bounty} ALGOs</TagLabel>
          </Tag>
        </CardFooter> */}
      </Stack>
    </Card>
  );
};

export default Location;
