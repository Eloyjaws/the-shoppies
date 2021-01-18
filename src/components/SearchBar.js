import React from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormLabel,
  Spinner,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../helpers/icons';
import { Card } from './Card';

export function SearchBar({ info, movieTitle, updateMovieTitle }) {
  return (
    <Card>
      <FormControl id="email">
        <FormLabel>Movie Title</FormLabel>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon color="green.500" />
          </InputLeftElement>
          <Input
            borderRadius={0}
            value={movieTitle}
            onChange={event => updateMovieTitle(event.target.value)}
            placeholder="Start typing movie title to fetch results..."
          />
          <InputRightElement>
            {info.isLoading ? (
              <Spinner size="sm" label="Fetching movies from OMDB" />
            ) : null}
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Card>
  );
}

SearchBar.propTypes = {
  info: PropTypes.object,
  movieTitle: PropTypes.string,
  updateMovieTitle: PropTypes.func.isRequired,
};
