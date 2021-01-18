import React from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  List,
  ListItem,
  ListIcon,
  Button,
  Link,
  Text,
} from '@chakra-ui/react';
import { CircleIcon } from '../helpers/icons';
import { Card } from './Card';
import { useAppState } from './AppContext';

function Nomination({ title, year, poster, imdbID }) {
  const { removeMovieFromNomineeList } = useAppState();
  const onClickHandler = () => removeMovieFromNomineeList(imdbID);
  return (
    <ListItem>
      <ListIcon as={CircleIcon} color="green.500" />
      {title}{' '}
      <Link color="green.600" title="View Poster" href={poster} target="_blank">
        ({year})
      </Link>
      <Button
        borderRadius="none"
        colorScheme="red"
        variant="outline"
        size="sm"
        ml={2}
        onClick={onClickHandler}
      >
        Remove
      </Button>
    </ListItem>
  );
}

Nomination.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  imdbID: PropTypes.string.isRequired,
};

export function Nominations() {
  const { nominatedMovies } = useAppState();
  if (nominatedMovies.length < 1) {
    return (
      <Card>
        <Text>Movies you nominate for the Shoppies will appear here</Text>
        <Text>You can nominate up to 5 movies</Text>
      </Card>
    );
  }
  return (
    <Card>
      <Heading as="h4" size="lg" mb={4}>
        Nominations
      </Heading>
      <List spacing={3} p={6}>
        {nominatedMovies.map(movieDetails => (
          <Nomination key={movieDetails.imdbID} {...movieDetails} />
        ))}
      </List>
    </Card>
  );
}
