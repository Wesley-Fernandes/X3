import { supabase } from "@modules/supabase/supabase";

async function getUser(){
    const { data: { user } } = await supabase.auth.getUser()
}



export {getUser}