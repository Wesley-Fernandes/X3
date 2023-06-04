'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import style from './page.module.css'

//Prime react
import {InputText} from 'primereact/inputtext'
import {Dropdown} from 'primereact/dropdown'
import {FileUpload} from 'primereact/fileupload'
import {Button} from 'primereact/button'

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { supabase } from '@modules/supabase/supabase'
import UserToAprove from '@modules/components/UserToAprove'
import { IUserSupabase } from '@modules/types/user'


export default function NewUser() {
  const toast = useRef<any>(null)
  const [data, setData] = useState<any[]>([])



  async function getDatas() {
    
    let { data: User, error } = await supabase
    .from('User')
    .select('*')
    .eq('status', false)

    if(error){
      throw new Error(error.message)
    }

    if(User){
      setData(User)
    }

    console.log(data)
  }

  useEffect(()=>{
    getDatas()
  },[])
  return (
    <main className={style.main}>
      {data.map(({id,admin,birth,cellphone,condominium,cpf,created_at,email,first_name,home_address,last_name,name,picture,started,user,week}:IUserSupabase)=>{
        return(
          <UserToAprove
            admin={admin}
            birth={birth}
            cellphone={cellphone}
            condominium={condominium}
            cpf={cpf}
            email={email}
            first_name={first_name}
            home_address={home_address}
            last_name={last_name}
            name={name}
            picture={picture}
            started={started}
            user={user}
            week={week}
            key={id}
            created_at={created_at}/>
        )
      })}

      {data.length==0 &&(<>Sem usuarios para aprovar.</>)}
    </main>
  )
}
