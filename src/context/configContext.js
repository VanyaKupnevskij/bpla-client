import { createContext } from 'react';

function noop() {}

export const ConfigContext = createContext({
  modeView: 'light',
  setModeView: noop,
});
