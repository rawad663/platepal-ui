import { createTheme } from '@mui/material/styles';

const baseTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#654bb6',
    },
    secondary: {
      main: '#b1cf55',
    },
  },
};

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
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
