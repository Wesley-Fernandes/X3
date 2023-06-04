import {create} from 'zustand';
import {IUserSupabase} from '../types/user'

interface IUserContext{
    user_context:   any;
    erase:  ()=>void;
    setup:  (data:any)=>any;

}


const empty_data = {
    admin:  false,
    user:   false,
    email: 'email@email.com',
    cellphone: 'None',
    condominium: 'None',
    cpf: 'None',
    created_at: String(Date.now()),
    birth:  '',
    name: '',
    first_name: 'None',
    last_name: 'None',
    home_address: 'None',
    picture: 'None',
    started: String(Date.now()),
    week: []
}

const contextUSER = create<IUserContext>((set)=>({
    user_context: {},
    erase: ()=>set((state)=>({user_context: {}})),
    setup: (data)=>set(()=>({user_context: data}))
}))


export {contextUSER}