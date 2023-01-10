import '@fontsource/tajawal/300.css';
import '@fontsource/tajawal/400.css';
import '@fontsource/tajawal/500.css';
import '@fontsource/tajawal/700.css';
import '../styles/globals.css';

import { ThemeProvider } from '@mui/material/styles';
import { createClient } from '@supabase/supabase-js';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import { AppBar } from '@/components/AppBar/AppBar';
import { SessionProvider } from '@/providers/SessionProvider';
import { SupabaseProvider } from '@/providers/SupabaseProvider';
import { getConfig } from '@/utils/getConfig';
import { darkTheme, lightTheme } from '@/utils/theme';

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
    <ThemeProvider theme={lightTheme}>
      <SessionProvider>
        <SupabaseProvider initialState={supabase}>
          <AppBar />
          <Component {...pageProps} />
        </SupabaseProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
