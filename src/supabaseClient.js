import { createClient } from "@supabase/supabase-js";

const url = 'https://ksnndffenzweodzwxwrq.supabase.co'
const key= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm5kZmZlbnp3ZW9kend4d3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2MjI1ODgsImV4cCI6MjAyMTE5ODU4OH0.-wJbdCaRA520cjf4Pmhp6A8iHHgRhUa1iAvDjKuQ6HQ'

export const supabase = createClient(url, key)