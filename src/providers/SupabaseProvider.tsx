import { SupabaseClient } from '@supabase/supabase-js';
import { createProvider } from './createProvider';

const { Provider, useContext } = createProvider<SupabaseClient>();

export const SupabaseProvider = Provider;
export const useSupabaseContext = useContext;
