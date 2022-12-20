import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { createClient } from '@supabase/supabase-js';

import { SupabaseProvider } from '@pdg/providers/SupabaseProvider';
import { SessionProvider } from '@pdg/providers/SessionProvider';

const supabase = createClient(
  'https://hbvilwbjflfdmbvuhfmv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhidmlsd2JqZmxmZG1idnVoZm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyODMyOTgsImV4cCI6MTk4Njg1OTI5OH0.DsGy4X0FzGKesE_0hpwVeweP83grutxeAfH9EOcM8qk',
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SupabaseProvider initialState={supabase}>
        <Component {...pageProps} />
      </SupabaseProvider>
    </SessionProvider>
  );
}
