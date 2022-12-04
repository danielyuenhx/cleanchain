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
import MoneyIcon from '../MoneyIcon';
import SmallMap from './SmallMap';
import { Link } from 'react-router-dom';

const Location = ({
  id,
  title,
  area,
  type,
  bounty,
  coordinates,
  isOpen,
  image,
}) => {
  const bg = useColorModeValue('#fcfbfd', '#1b1c1f');
  const hoverbg = useColorModeValue('#f6f6f6', '#28292e');
  const typeColor = useColorModeValue('#f5f4f6', '#121316');

  return (
    <Link to={id}>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        bg={bg}
        transition="ease-in-out 200ms"
        _hover={{ bg: hoverbg }}
        cursor="pointer"
      >
        {/* <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={image}
      /> */}
        <SmallMap position={[coordinates[1], coordinates[0]]} />
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
              <TagLabel>{bounty} microALGOs</TagLabel>
            </Tag>

            <Stack direction="row" alignItems="center">
              <Text fontSize="lg" fontWeight={700}>
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

            <Text fontSize="sm" fontWeight={500} color="gray.600">
              {type}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {area}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {coordinates[0]}, {coordinates[1]}
            </Text>
            <Text
              mt="0.5rem"
              fontSize="lg"
              color={isOpen ? 'green.500' : 'gray.500'}
              fontWeight={700}
            >
              {isOpen ? 'OPEN' : 'CLOSED'}
            </Text>
          </CardBody>
          {/* <Divider />
        <CardFooter>
          <Button>View Full Details</Button>
        </CardFooter> */}
        </Stack>
      </Card>
    </Link>
  );
};

export default Location;
