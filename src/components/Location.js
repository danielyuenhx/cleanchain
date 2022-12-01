import React from 'react';
import {
  Card,
  Image,
  Stack,
  CardBody,
  Text,
  Heading,
  CardFooter,
  Button,
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import MoneyIcon from './MoneyIcon';

const Location = ({ image, title, text, bounty }) => {
  const bg = useColorModeValue('#fcfbfd', '#1b1c1f');

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      bg={bg}
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={image}
      />

      <Stack>
        <CardBody>
          <Tag
            size="lg"
            variant="subtle"
            right="1rem"
            position="absolute"
            margin="auto 0"
            top={0}
            bottom={0}
            colorScheme="green"
            h="1rem"
          >
            <TagLeftIcon boxSize="12px" as={MoneyIcon} />
            <TagLabel>{bounty} ALGOs</TagLabel>
          </Tag>

          <Text fontSize="md" fontWeight={700}>
            {title}
          </Text>

          <Text py="2" fontSize="sm" color="gray.500">{text}</Text>
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
