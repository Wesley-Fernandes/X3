import { supabase } from "@modules/supabase/supabase";

interface IItem{
    items: string[];
    userName: string;
    userID: string;
    status: 'Em espera'|'Rejeitado'|'Aprovado';
    adminName: string|null;
    adminID: string|null;
    term: string|null;
}