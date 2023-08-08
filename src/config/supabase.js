

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env.PG_URL_SUPABASE, process.env.SUPABASE_KEY)
