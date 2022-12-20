import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.css';
import config from '../config/dev.json';

import type { AppProps } from 'next/app';
import { createClient } from '@supabase/supabase-js';

import { AppBar } from '@pdg/components/AppBar/AppBar';
import { SupabaseProvider } from '@pdg/providers/SupabaseProvider';
import { SessionProvider } from '@pdg/providers/SessionProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const supabase = createClient((config as any).supabase.host, (config as any).supabase.anon);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#654bb6',
    },
    secondary: {
      main: '#b1cf55',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <SupabaseProvider initialState={supabase}>
          <AppBar />
          <Component {...pageProps} />
        </SupabaseProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
