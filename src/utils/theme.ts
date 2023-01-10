import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const baseTheme = {
  palette: {
    mode: 'dark',
    primary: {
      light: '#e5f5ec',
      main: '#20a361',
      dark: '#005b31',
    },
    secondary: {
      main: '#22acac',
      dark: '#004a45',
    },
  },
  typography: {
    h1: {
      fontSize: '3.55rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '2.1rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.75rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1.15rem',
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
