import { createClient } from "@supabase/supabase-js";
import { error } from "console";


const supaKEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supaPUB = process.env.NEXT_PUBLIC_SUPABASE_URL;

if(!supaKEY||!supaPUB){
    throw new Error("missing supabasse params");
}
const supabase = createClient(supaPUB, supaKEY);

export {supabase};