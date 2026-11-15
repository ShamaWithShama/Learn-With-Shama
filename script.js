const SUPABASE_URL = "https://ermzrekcggfkwsqinnae.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_sXjW4HL1d8EZ1fPodhusbw_cMQWBfUN";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Learn with Shama connected to Supabase!");