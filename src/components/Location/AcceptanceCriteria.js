import React from 'react';
import {
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';

const AcceptanceCriteria = () => {
  return (
    <Box mt="1.5rem" mb="1.5rem">
      <Text fontSize="2xl" fontWeight={600} mb="1rem">
        Acceptance Criteria
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Determinand</Th>
              <Th isNumeric>Current</Th>
              <Th isNumeric>Threshold</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>ph Value</Td>
              <Td isNumeric>9</Td>
              <Td isNumeric>7</Td>
            </Tr>
            <Tr>
              <Td>Turbidity</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>100</Td>
            </Tr>
            <Tr>
              <Td>Dissolved Oxygen Level (mg/L)</Td>
              <Td isNumeric>3</Td>
              <Td isNumeric>7</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AcceptanceCriteria;
