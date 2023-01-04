import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const baseTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#5727b0',
      dark: '#28144D',
    },
    secondary: {
      main: '#FFD500',
    },
  },
};

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    lightBackground: {
      main: '#1e1e1e',
    },
    mode: 'dark',
  },
});

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    lightBackground: {
      main: grey[200],
    },
    mode: 'light',
  },
});
