import { createTheme } from '@mui/material/styles';

const baseTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00509D',
      dark: '#00296B',
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
    mode: 'light',
  },
});
