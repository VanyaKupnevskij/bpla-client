import { createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#eb9a2a',
    },
  },
});

const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#e14e31',
    },
  },
});

export default function useTheme() {
  const [modeView, setModeView] = useState('light');

  useEffect(() => {
    setModeView(localStorage.getItem('themeMode') ?? 'light');
  }, []);

  return { themeDark, themeLight, modeView, setModeView };
}
