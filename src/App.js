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

  const [searchString, setSearchString] = useState('');
  const [bountyRange, setBountyRange] = useState([0, 2000]);

  const onChangeSearchHandler = event => {
    setSearchString(event.target.value);
  };

  const onChangeSliderHandler = val => {
    setBountyRange(val);
  };

  useEffect(() => {
    let result = fetchedLocations;
    if (searchString) {
      result = result.filter(
        loc =>
          loc.comment.toLowerCase().includes(searchString.toLowerCase()) ||
          loc.area.label.toLowerCase().includes(searchString.toLowerCase()) ||
          loc.samplingPointType.label
            .toLowerCase()
            .includes(searchString.toLowerCase())
      );
    }
    result = result.filter(
      loc => loc.bounty >= bountyRange[0] && loc.bounty <= bountyRange[1]
    );
    setLocations(result);
  }, [searchString, bountyRange]);

  return (
    <>
      <Navbar />
      <Box w="full" h="calc(100vh - 4rem)" position="relative" top="4rem">
        <Flex justifyContent="flex-start" h="100%">
          <Sidebar
            onChangeSearch={onChangeSearchHandler}
            onChangeSlider={onChangeSliderHandler}
          />
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
