'use client'

import React from 'react'
import style from './page.module.css'

import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { supabase } from '@modules/supabase/supabase'
import { contextUSER } from '@modules/context/ctx_user'

export default function Admin() {
  const {push} = useRouter();
  const {erase} = contextUSER();
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
      <div className={style.Admin}>


      </div>
      <div className={style.options}>
        <Button
          key={'FUNCIONARIOS'}
          type='button'
          icon='pi pi-user-plus'
          label="NOVO FUNCIONARIO"
          onClick={()=>{push('/Admin/NewUser')}}
          style={{width:'100%', fontSize: '1.5rem', fontWeight: 'bold'}}
          severity="info" />

        <Button
          key={'SOLICITAÇÕES'}
          type='button'
          icon='pi pi-shopping-cart'
          label="SOLICITAÇÕES"
          onClick={()=>{push('/Admin/Requests')}}
          style={{width:'100%', fontSize: '1.5rem', fontWeight: 'bold'}}
          severity="info" />


        <Button
          key={'SAIR'}
          type='button'
          icon='pi pi-sign-out'
          label="SAIR"
          onClick={exit}
          style={{width:'100%', fontSize: '1.5rem', fontWeight: 'bold'}}
          severity="danger" />
      </div>
    </main>
  )
}
