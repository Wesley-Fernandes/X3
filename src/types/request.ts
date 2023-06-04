export interface IGetRequest{
    inserted_at: any;
    updated_at: any;
    items: string[];
    username: string;
    userid: string;
    status: string|null;
    adminname: string|null;
    term: string;
    completed: boolean;
    condominium: string;
    job: string;
    adminResponse: string|null;
}