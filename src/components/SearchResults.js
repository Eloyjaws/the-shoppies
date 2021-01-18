import React from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  List,
  ListItem,
  ListIcon,
  Button,
  Text,
  Link,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { CircleIcon } from '../helpers/icons';
import { Card } from './Card';
import { useAppState } from './AppContext';

function SearchResult({ title, year, poster, imdbID }) {
  const {
    addMovieToNomineeList,
    isMovieInNomineeList,
    canAddMovieToNomineeList,
  } = useAppState();
  const hasBeenNominated = isMovieInNomineeList(imdbID);
  const canNotBeNominated = !canAddMovieToNomineeList() || hasBeenNominated;

  const onClickHandler = () =>
    hasBeenNominated
      ? () => null
      : addMovieToNomineeList({ title, year, poster, imdbID });

  return (
    <ListItem>
      <ListIcon
        as={CircleIcon}
        color={hasBeenNominated ? 'blue.500' : 'green.500'}
      />
      {title}{' '}
      <Link title="View Poster" href={poster} target="_blank">
        ({year})
      </Link>
      <Button
        borderRadius="none"
        colorScheme={canNotBeNominated ? 'normal' : 'green'}
        variant="outline"
        cursor={canNotBeNominated ? 'not-allowed' : 'pointer'}
        size="sm"
        ml={2}
        onClick={onClickHandler}
        isDisabled={canNotBeNominated}
      >
        Nominate
      </Button>
    </ListItem>
  );
}

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  imdbID: PropTypes.string.isRequired,
};

export function SearchResults({ info, movieTitle }) {
  if (movieTitle === '') {
    return (
      <Card>
        <Text>
          When you search for a movie by title, search results appear here.
        </Text>
        <Text>Go on, give it a shot!</Text>
      </Card>
    );
  }

  if (info.isLoading) {
    return (
      <Card>
        <Heading as="h4" size="lg" mb={4}>
          Loading results for {`"${movieTitle || ''}"`}...
        </Heading>
        <Center height="60%">
          <Spinner size="xl" />
        </Center>
      </Card>
    );
  }
  if (info.isError) {
    return (
      <Card>
        <Text>Failed to load Movie</Text>
      </Card>
    );
  }
  if (!info.data) {
    return (
      <Card>
        <Text>No Movie Data Available for {movieTitle}.</Text>
      </Card>
    );
  }

  if (info.data.Response === 'False') {
    return (
      <Card>
        <Text>Error: {info.data.Error}</Text>
      </Card>
    );
  }
  return (
    <Card>
      <Heading as="h4" size="lg" mb={4}>
        Results for {`"${movieTitle || ''}"`}
      </Heading>
      <List spacing={3} p={6}>
        {/* To ensure only movies can be nominated */}
        {info.data.Search.filter(({ Type: type }) => type === 'movie').map(
          ({ Year: year, Title: title, Poster: poster, imdbID }) => (
            <SearchResult key={imdbID} {...{ year, title, poster, imdbID }} />
          )
        )}
      </List>
    </Card>
  );
}

SearchResults.propTypes = {
  info: PropTypes.object,
  movieTitle: PropTypes.string,
};
