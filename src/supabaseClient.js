import { createClient } from "@supabase/supabase-js";

const url = 'https://lueaeybeheiinzprakua.supabase.co'
const key =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWFleWJlaGVpaW56cHJha3VhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjIzMTQwNCwiZXhwIjoyMDIxODA3NDA0fQ.3IP2QV0ZJLNLFJf-0C4YxhNG149mkWHWszJh_k6z1Hc'

console.log(process.env.REACT_APP_SUPABASE_ANON_KEY)
console.log(process.env.REACT_APP_SUPEBASE_URL)


export const supabase = createClient(url, key)