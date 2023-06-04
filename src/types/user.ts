export interface IUserLogged{
    created_at: string;
    admin: boolean;
    user: boolean;
    name: string;
    first_name: string;
    last_name: string;
    cellphone: string;
    email: string;
    picture: string;
    birth: string;
    cpf: string;
    started: string;
    week: any[];
    condominium: string;
    home_address: string;
}
export interface IUserSupabase{
    id?:string;
    created_at: any;
    admin: any;
    user: any;
    name: any;
    first_name: any;
    last_name: any;
    cellphone: any;
    email: any;
    picture: any;
    birth: any;
    cpf: any;
    started: any;
    week: any;
    condominium: any;
    home_address: any;
}