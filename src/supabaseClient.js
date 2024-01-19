import { createClient } from "@supabase/supabase-js";

const url = 'https://ksnndffenzweodzwxwrq.supabase.co'
const key= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm5kZmZlbnp3ZW9kend4d3JxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTYyMjU4OCwiZXhwIjoyMDIxMTk4NTg4fQ.d3nHaWmiESHVh-pKz2vlrmZNOxHIaFSOIRYxiVHjRsM'

export const supabase = createClient(url, key)