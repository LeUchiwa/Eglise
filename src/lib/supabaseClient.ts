import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://cmszlrjbgozgmswhtyeb.supabase.co',
  'sb_publishable_T1dkK5rTaelXEzGRXhJIkw_VRibRKUe'
)