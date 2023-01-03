import '@material-ui/core/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    lightBackground?: Palette['primary'];
  }
  interface PaletteOptions {
    lightBackground?: PaletteOptions['primary'];
  }
}
