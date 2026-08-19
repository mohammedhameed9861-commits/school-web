import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Service-role client — only used in server-side code (API routes, Server Actions).
// Never exposed to the browser.
export const supabase = createClient(url, key);
