import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llmfmkrrjmdxxanutlbj.supabase.co'
const supabaseKey = 'sb_publishable_tBwoxpYIl0JJEH9d4QKwcw_QJe-bbAk'

export const supabase = createClient(supabaseUrl, supabaseKey)