'use client'

import { IUserLogged } from '@modules/types/user';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
import MakeLogin from '@modules/components/MakeLogin';
import MakeUser from '@modules/components/MakeUser';
import style from './page.module.css'

interface Ilogin{
    email: string;
    password: string;
}

export interface ICreatingUser{
    next?: any;
    info?: any;
    login?: Ilogin;
    informations?: any;
}
export default function CreateUser() {
    const [part, setPart] = useState<number>(1)
    const [login, setLogin] = useState<Ilogin>({email:'', password: ''});
    const [user, setUser] = useState<any>({});

  return (
    <main className={style.main}>
        {part==1?(
            <MakeLogin
                next={setPart}
                info={setLogin}/>
        ):(
            <MakeUser
                info={setUser}
                login={login}
                informations={user} />
        )}
    </main>
  )
}
