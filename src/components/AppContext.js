import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from '../helpers/useLocalStorage';

const appContext = createContext();

export function Provider({ children }) {
  // eslint-disable-next-line no-use-before-define
  const value = useProvideAppState();
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function useAppState() {
  return useContext(appContext);
}

function useProvideAppState() {
  const [nominatedMovies, setNominatedMovies] = useLocalStorage(
    'nominations',
    []
  );

  const isMovieInNomineeList = imdbID => {
    for (let i = 0; i < nominatedMovies.length; i += 1) {
      if (nominatedMovies[i].imdbID === imdbID) return true;
    }
    return false;
  };

  const canAddMovieToNomineeList = () => nominatedMovies.length < 5;

  const addMovieToNomineeList = movieDetails => {
    if (
      isMovieInNomineeList(movieDetails.imdbID) ||
      !canAddMovieToNomineeList()
    ) {
      return false;
    }
    setNominatedMovies([...nominatedMovies, movieDetails]);
    return true;
  };
  const removeMovieFromNomineeList = imdbID => {
    setNominatedMovies(
      nominatedMovies.filter(movie => movie.imdbID !== imdbID)
    );
  };

  // Return the user object and auth methods
  return {
    nominatedMovies,
    canAddMovieToNomineeList,
    isMovieInNomineeList,
    addMovieToNomineeList,
    removeMovieFromNomineeList,
  };
}
