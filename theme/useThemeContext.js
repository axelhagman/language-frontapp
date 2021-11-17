import { useContext } from 'react';
import { ThemeContext } from './themeContext';

const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default useThemeContext;
