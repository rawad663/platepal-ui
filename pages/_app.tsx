import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.css';

import { ThemeProvider } from '@mui/material/styles';
import { AppBar } from '@pdg/components/AppBar/AppBar';
import { SessionProvider } from '@pdg/providers/SessionProvider';
import { SupabaseProvider } from '@pdg/providers/SupabaseProvider';
import { getConfig } from '@pdg/utils/getConfig';
import { darkTheme, lightTheme } from '@pdg/utils/theme';
import { createClient } from '@supabase/supabase-js';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

const config = getConfig();
const supabase = createClient(config.supabase.host, (config as any).supabase.anon);

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    (window as any).theme = {
      darkTheme,
      lightTheme,
    };
  }, []);

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
