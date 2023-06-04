'use client'

import styles from './page.module.css'

import { supabase } from '@modules/supabase/supabase'
import { useRouter } from 'next/navigation'

//PRIME REACT
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { FormEvent, useEffect, useState } from 'react'
import { contextUSER } from '@modules/context/ctx_user'
import { ICreatingUser } from './CreateUser/page'
import { IUserSupabase } from '@modules/types/user'

export default function Home() {
  const   [loading, setLoading] = useState<boolean>(false);
  const   [dom, setDom] = useState<boolean>(false);
  const   setup = contextUSER((state)=>state.setup);
  const   {push} = useRouter();


  async function submit(event:FormEvent) {
    event.preventDefault();
    setLoading(true)
    const target = event.target as typeof event.target &{
      email: {value: string},
      password:  {value: string}
    }


    const email = target.email.value;
    const password = target.password.value;

    if(!email || !password){
      setLoading(false)
      throw new Error('Missing email or password params!');
    }


    let { data:Login, error:LoginError } = await supabase.auth.signInWithPassword({email, password});

    if(LoginError){
      setLoading(false)
      console.error(LoginError.message);
      return
    }

    console.log(Login)
    if(Login.user){
      let { data: User, error:UserError } = await supabase
      .from('User')
      .select("*")
      .eq('email', Login.user.email)


      if(UserError){
        setLoading(false)
        console.error(UserError.message);
        return
      }

      console.log(User)
      const getUser:any = JSON.stringify(User);

      if(User){
        localStorage.setItem('X3_account_user', getUser);
        setLoading(false);
        push(getUser.admin==true?'/Admin':'/User');
        return
      }

      return
    }

    return
  }

  useEffect(()=>{
    setDom(true)
  }, [])
  return (
    <main className={styles.main}>
      {dom==true &&(
        <form className={styles.formulary} onSubmit={submit}>
        <h1  className={styles.title}>X3</h1>
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
          label="FAZER LOGIN"
          loading={loading}
          style={{width: '320px'}}
          size='large'
          type='submit'
          severity="info" />
        <Button
          label="CRIAR CONTA"
          loading={loading}
          style={{width: '320px'}}
          size='large'
          type='button'
          onClick={()=>{push('/CreateUser')}}
          severity="secondary" />
      </form>
      )}
    </main>
  )
}
