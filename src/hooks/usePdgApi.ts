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
        timeout: 10000,
        headers: session?.access_token ? { Authorization: session?.access_token } : {},
      }),
    [session?.access_token],
  );

  return instance;
};
