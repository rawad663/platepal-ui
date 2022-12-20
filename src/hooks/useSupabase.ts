import { useSupabaseContext } from '@pdg/providers/SupabaseProvider';

export const useSupabase = () => {
  const [supabase] = useSupabaseContext();

  if (!supabase) throw new Error('Supabase not initialized');

  return supabase;
};
