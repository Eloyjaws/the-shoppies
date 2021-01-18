import React from 'react';
import {
  theme,
  CSSReset,
  extendTheme,
  ChakraProvider,
  ColorModeScript,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import PropTypes from 'prop-types';

const darkModeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

// setup light/dark mode global defaults
const styles = {
  global: props => ({
    body: {
      color: mode(theme.colors.gray[700], theme.colors.whiteAlpha[900])(props),
      bg: mode(theme.colors.red[50], theme.colors.gray[800])(props),
      borderColor: mode(
        theme.colors.gray[200],
        theme.colors.whiteAlpha[300]
      )(props),
      placeholderColor: mode(
        theme.colors.gray[500],
        theme.colors.whiteAlpha[400]
      )(props),
    },
  }),
};

const components = {
  Button: {
    baseStyle: props => ({
      variant: mode('solid', 'outline')(props),
    }),
  },
};

const extendedTheme = extendTheme({ darkModeConfig, styles, components });

export function ThemeProvider({ children }) {
  return (
    <ChakraProvider theme={extendedTheme}>
      <CSSReset />
      <ColorModeScript
        initialColorMode={extendedTheme.config.initialColorMode}
      />
      {children}
    </ChakraProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
