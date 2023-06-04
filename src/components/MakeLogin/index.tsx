'use client'

import Image from 'next/image'
import styles from './page.module.css'

import { supabase } from '@modules/supabase/supabase'

//PRIME REACT
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { FormEvent, useState } from 'react'
import { ICreatingUser } from '@modules/app/CreateUser/page'
import { useRouter } from 'next/navigation'
import style from './page.module.css'



export default function MakeLogin({next, info}:ICreatingUser) {
  const  [loading, setLoading] = useState<boolean>(false);
  const {push} = useRouter();


  async function submit(e:FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target &{
      email:      {value: string},
      password:   {value: string}
    };


    const email = target.email.value;
    const password = target.password.value;

    if(!email || !password){
      throw new Error('Missing email or passoword!');
    }

    let { data: User, error } = await supabase
    .from('User')
    .select("*").eq('email', email);


    if(error){
      throw new Error(error.message)
    }



    console.log({user: User})
    if(User){
      switch (User.length){
        case 1:
          throw new Error('User email alredy exist in database!');
        case 0:
          info({email, password});
          next(2);
          break
      }
    }
  }

  return (
    <form className={styles.formulary} onSubmit={submit}>
      <h1  className={styles.title}>Credenciais</h1>
      <p>Suas informações para login</p>


      <span className="p-input-icon-left">
        <i className="pi pi-envelope" />
        <InputText
          name='email'
          placeholder="Email@email.com"
          style={{width: '320px'}}
          type='email' />
      </span>


      <span className="p-input-icon-left">
        <i className="pi pi-lock" />
        <InputText
          name='password'
          placeholder="Password"
          style={{width: '320px'}}
          type='password' />
      </span>

      <Button
        style={{width: '320px'}}
        type='submit'
        label="AVANÇAR" />

      <Button
        style={{width: '320px'}}
        type='button'
        onClick={()=>{push('/')}}
        severity='secondary'
        label="VOLTAR" />
    </form>
  )
}
