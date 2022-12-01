import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Image,
  Stack,
  Divider,
  ButtonGroup,
  Button,
  Badge,
  Flex,
  Box,
  Tag,
  TagLeftIcon,
  TagLabel
} from '@chakra-ui/react';
import MoneyIcon from './MoneyIcon';

const Location = ({ image, title, text, bounty, position, onClickHandler }) => {
  return (
    <Card maxW="45%">
      <CardBody position="relative" pb={0}>
        <Image src={image} borderRadius="lg" />
        <Stack mt="4" spacing="2">
          <Flex justifyContent="space-between">
            <Box maxW="40%">
              <Heading size="sm">{title}</Heading>
            </Box>
            <Stack direction="row" alignItems="center">
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
          </Flex>
          <Text marginBottom="4rem !important">{text}</Text>
          {/* <Text color="blue.600" fontSize="xl">
            {bounty} ALGOs
          </Text> */}
          <Tag size="lg" variant="subtle" bottom={0} marginBottom="1rem !important" position="absolute">
            <TagLeftIcon boxSize="12px" as={MoneyIcon} />
            <TagLabel>{bounty} ALGOs</TagLabel>
          </Tag>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Hunt
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={onClickHandler.bind(null, position)}>
            View on map
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Location;
