import { Session } from '@supabase/supabase-js';

import { createProvider } from './createProvider';

const { Provider, useContext } = createProvider<Session>();

export const SessionProvider = Provider;
export const useSessionContext = useContext;
