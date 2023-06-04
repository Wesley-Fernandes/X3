import React from 'react'
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { InputText } from 'primereact/inputtext';
import { IUserSupabase } from '@modules/types/user';
import { supabase } from '@modules/supabase/supabase';
import { Button } from 'primereact/button';
import style from './component.module.css'
import ModalToAprove from '../ModalToAprove';


export default function UserToAprove({id, name, first_name, admin,birth, cellphone,condominium,cpf,created_at,email,home_address,last_name,picture,started,user}:IUserSupabase) {
    const flexx = {
        'width': '100%',
        'margin': '5px'
    }


    async function updateToUser() {
        const { data, error } = await supabase
        .from('User')
        .update({ user: true })
        .eq('email', email)

        if(error){
            throw new Error(error.message)
        }

        console.log('Atualizado com sucesso!');
    }

    return (
    <Panel header={email} toggleable style={{width: '100%'}}>
        <div className={style.informations}>
            <span className={style.information}>
                <i className='pi pi-user mr-2'/>
                {`${name} ${first_name} ${last_name}`}
            </span>

            <span className={style.information}>
                <i className='pi pi-calendar mr-2'/>
                {birth}
            </span>

            <span className={style.information}>
                <i className='pi pi-phone mr-2'/>
                {cellphone}
            </span>

            <span className={style.information}>
                <i className='pi pi-verified mr-2'/>
                {cpf}
            </span>

            <span className={style.information}>
                <i className='pi pi-map-marker mr-2'/>
                {home_address}
            </span>

        </div>


        <footer className={style.footer}>
            <div className={style.important}>
                <ModalToAprove email={email}/>
            </div>
        </footer>
    </Panel>
  )
}
