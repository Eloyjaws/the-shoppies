import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { Heading, Grid, Container, SimpleGrid } from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Nominations } from './components/Nominations';
import { NotificationCard } from './components/NotificationCard';
import { useDebounce } from './helpers/useDebounce';
import { fetchMovieList } from './Api';

import { Provider } from './components/AppContext';

function App() {
  const [movieTitle, updateMovieTitle] = useState('');
  const debouncedMovieTitle = useDebounce(movieTitle, 500);

  // info States: { isLoading, isError, data, error }
  const info = useQuery(['movie', debouncedMovieTitle], () => {
    if (debouncedMovieTitle === '') return;
    return fetchMovieList(debouncedMovieTitle);
  });

  return (
    <Provider>
      <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Container maxW="6xl" centerContent>
          <Heading alignSelf="flex-start" mb={8}>
            The Shoppies
          </Heading>
          <SearchBar {...{ isLoading: info.isLoading, updateMovieTitle }} />
          <NotificationCard />
          <SimpleGrid width="100%" columns={{ sm: 1, md: 2 }} spacing={6}>
            <SearchResults {...{ info, movieTitle }} />
            <Nominations />
          </SimpleGrid>
        </Container>
      </Grid>
    </Provider>
  );
}

export default App;
