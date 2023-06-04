'use client'

import React from 'react'
import style from './page.module.css'

import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button';
import { supabase } from '@modules/supabase/supabase';
export default function page() {
  const {push} = useRouter();

  async function exit(){
    const {error} = await supabase.auth.signOut();


    if(error){
      throw new Error(error.message);
    }else{
      localStorage.removeItem('X3_account_user');
      push('/');
    }
  }

  return (
    <main className={style.main}>
      <div className={style.options}>
        <Button
          type='button'
          label="Solicitar material"
          onClick={()=>{push('/User/Request')}}
          style={{width:'100%', fontSize: '1.5rem', fontWeight: 'bold'}}
          severity="info" />
        <Button
          type='button'
          label="Minhas solicitações"
          onClick={()=>{push('/User/Requests')}}
          style={{width:'100%', fontSize: '1.5rem', fontWeight: 'bold'}}
          severity="info" />

        <Button
          type='button'
          label="SAIR"
          onClick={exit}
          style={{width:'100%', fontSize: '1.5rem', fontWeight: 'bold'}}
          severity="info" />
      </div>
    </main>
  )
}
