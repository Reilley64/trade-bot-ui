import React, { cloneElement } from 'react';
import { dark, light, ThemeProvider } from 'reilleykit';

import useLocalStorage from './hooks/useLocalStorage';

const AppWrapper = ({ children }) => {
  const [mode, setMode] = useLocalStorage('mode', 'light');

  return (
    <ThemeProvider mode={mode === 'dark' ? dark : light}>
      {cloneElement(children, { mode, setMode })}
    </ThemeProvider>
  );
};

export default AppWrapper;
