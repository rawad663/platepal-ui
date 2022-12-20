import { useSessionContext } from '@pdg/providers/SessionProvider';
import { useEffect } from 'react';
import { useSupabase } from './useSupabase';

export const useSession = () => {
  const [session, setSession] = useSessionContext();
  const { auth } = useSupabase();

  useEffect(() => {
    if (session) return;

    (async () => {
      const {
        data: { session },
      } = await auth.getSession();

      console.log(session);

      setSession(session ?? undefined);
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
    session,
    signOut,
    signInWithOAuth,
  };
};
