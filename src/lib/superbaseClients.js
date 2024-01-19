const { createClient } = supabase
const _supabase = createClient(
    
   process.env.REACT_APP_SUPEBASE_URL, 
   process.env.REACT_APP_SUPABASE_ANON_KEY)

console.log('Supabase Instance: ', _supabase)