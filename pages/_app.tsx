import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { createClient } from '@supabase/supabase-js';
import { ThemeProvider } from '@mui/material/styles';

import config from '@root/config/dev.js';

import { AppBar } from '@pdg/components/AppBar/AppBar';
import { SupabaseProvider } from '@pdg/providers/SupabaseProvider';
import { SessionProvider } from '@pdg/providers/SessionProvider';
import { darkTheme } from '@pdg/utils/theme';

const supabase = createClient(config.supabase.host, (config as any).supabase.anon);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <SessionProvider>
        <SupabaseProvider initialState={supabase}>
          <AppBar />
          <Component {...pageProps} />
        </SupabaseProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
