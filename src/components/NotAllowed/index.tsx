'use client'
import React, { useEffect } from 'react'
import style from './component.module.css'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'
import { contextUSER } from '@modules/context/ctx_user'
import { supabase } from '@modules/supabase/supabase'

export default function NotAllowed() {
    const {push} = useRouter()

    async function logout() {
      let { error } = await supabase.auth.signOut()
      localStorage.clear()
      localStorage.removeItem('X3_account_user')
    }

    useEffect(()=>{
      logout()
    }, []);
  return (
    <main className={style.main}>
        <div className={style.component}>
            <h1 className={style.title}>Sem permissão</h1>
            <p className={style.about}>
                Você não têm permissão para acessar essa página.
                Faça login para continuar.
            </p>
            <Button
                label="VOLTAR"
                style={{width: '320px'}}
                size='large'
                type='button'
                onClick={()=>{push('/')}}
                severity="secondary" />
        </div>
    </main>
  )
}
