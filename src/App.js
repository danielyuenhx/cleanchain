import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import LocationList from './components/LocationList';
import Sidebar from './components/Sidebar';
import { getSamplePoints } from './actions';

function App() {
  const [locations, setLocations] = useState([]);
  const [fetchedLocations, setFetchedLocations] = useState([]);
  useEffect(() => {
    getSamplePoints().then(res => {
      setLocations([...res]);
      setFetchedLocations([...res]);
    });
  }, []);

  const onChangeHandler = event => {
    const string = event.target.value;
    if (string) {
      setLocations(
        fetchedLocations.filter(loc =>
          loc.comment.toLowerCase().includes(string.toLowerCase()) || loc.area.label.toLowerCase().includes(string.toLowerCase())
        )
      );
    }
    else {
      setLocations(fetchedLocations);
    }
  };

  return (
    <>
      <Navbar />
      <Box w="full" h="calc(100vh - 4rem)" position="relative" top="4rem">
        <Flex justifyContent="flex-start" h="100%">
          <Sidebar onChange={onChangeHandler} />
          <LocationList locations={locations} />
        </Flex>
      </Box>
    </>
    /* <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box> */
  );
}

export default App;
