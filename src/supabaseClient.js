import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tvbssciqwiwjpkqeyula.supabase.co";
const supabaseAnonKey = "sb_publishable_Vw6B_ha8vToit67yLdTWFQ_sMruON0t";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);