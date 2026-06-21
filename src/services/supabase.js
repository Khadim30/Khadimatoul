import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xgztpctqdzqzibehimlq.supabase.co";
const supabaseKey = "sb_publishable_CeQIW8gCp3FLMEwwpDsLww_zr60AN8U";

export const supabase = createClient(supabaseUrl, supabaseKey);