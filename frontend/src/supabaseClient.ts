import { createClient } from "@supabase/supabase-js";

export const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
export const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
