import { createClient } from "@supabase/supabase-js";

const url = 'https://tagjarpmutrkhsoekstk.supabase.co'
const key =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZ2phcnBtdXRya2hzb2Vrc3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0OTk5MDYsImV4cCI6MjAyMzA3NTkwNn0.Gf6W-_T8SIOxQ_kF58jS228wt_4n7PZQcs-w3UKyxmk'



export const supabase = createClient(url, key)