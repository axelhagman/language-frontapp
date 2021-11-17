import React from 'react';
import { hslColors } from './colors';

export const DEFAULT_THEME = {
  colors: hslColors,
};

export const ThemeContext = React.createContext(DEFAULT_THEME);
