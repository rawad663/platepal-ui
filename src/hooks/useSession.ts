import { useEffect } from 'react';

import { useSessionContext } from '@/providers/SessionProvider';

import { useSupabase } from './useSupabase';

export const useSession = () => {
  const [session, setSession] = useSessionContext();
  const { auth } = useSupabase();

  useEffect(() => {
    (async () => {
      if (!session) {
        const { data } = await auth.getSession();
        return setSession(data.session ?? undefined);
      }

      const now = new Date();
      const sessionExpiry = session.expires_at ? new Date(session.expires_at * 1000) : null;

      // Access token expired
      if (sessionExpiry && now > sessionExpiry) {
        const { data } = await auth.refreshSession();
        setSession(data.session ?? undefined);
      }
    })();
  }, [session, auth, setSession]);

  const signOut = async () => {
    await auth.signOut();
    setSession(undefined);
  };

  const signInWithOAuth = async () => {
    await auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return {
    user: session?.user,
    session,
    signOut,
    signInWithOAuth,
  };
};
