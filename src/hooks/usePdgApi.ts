import { pdgServer } from '@root/config/dev';
import axios from 'axios';
import { useMemo } from 'react';

import { useSession } from './useSession';

export const usePdgApi = () => {
  const { session } = useSession();

  const instance = useMemo(
    () =>
      axios.create({
        baseURL: `${pdgServer.host}/api`,
        timeout: 30000,
        headers: {
          // Authorization: session?.access_token ? `Bearer ${session?.access_token}` : undefined,
        },
      }),
    [session?.access_token],
  );

  return instance;
};
