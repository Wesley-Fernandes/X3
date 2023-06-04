'use client'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import React, { FormEvent, useEffect, useState } from 'react'
import { ICreatingUser } from '@modules/app/CreateUser/page';
import { Button } from 'primereact/button';
import { supabase } from '@modules/supabase/supabase';
import { useRouter } from 'next/navigation';

import style from './page.module.css'

export default function MakeUser({next, info, informations, login}:ICreatingUser) {
  const [loading, setLoading] = useState(false);
  const {push} = useRouter();
    
  async function submit(params:FormEvent) {
    params.preventDefault();
    setLoading(true)

    const target = params.target as typeof params.target & {
      name:         {value: string},
      first_name:   {value: string},
      last_name:    {value: string},
      cpf:          {value: string},
      cellphone:    {value: string},
      home_address: {value: string},
      birth:        {value: string},
    }
  
    const name          = target.name.value;
    const first_name    = target.first_name.value;
    const last_name     = target.last_name.value;
    const cpf           = target.cpf.value;
    const cellphone     = target.cellphone.value;
    const home_address  = target.home_address.value;
    const birth         = target.birth.value;

    if(!name||!first_name||!last_name||!cpf||!cellphone||!home_address||!birth){
      setLoading(false);
      throw new Error('Missing informations!');
    }

    if(login){
      let { data:login_data, error:login_error } = await supabase.auth.signUp({
        email: login.email,
        password: login.password
      })

      if(login_error){
        setLoading(false)
        throw new Error(login_error.message)
      }

      console.log('User has been created!');

      const { data:user_data, error:user_error } = await supabase
      .from('User')
      .insert([
        {
          name,
          first_name,
          email: login.email,
          last_name,
          cpf,
          cellphone,
          home_address,
          birth,
          admin: false,
          user: false,
          week: [],
          started: String(Date.now()),
          condominium: 'Nenhum',
          picture: 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'
        },
      ]);


      if(user_error){
        setLoading(false)
        throw new Error(user_error.message);
      }

      console.log('Informations of user has been created with success!');
      alert('Usuario criado com sucesso');
      setLoading(false)
      return

    }

    


  }

  return (
    <form onSubmit={submit} className={style.formulary}>
      <h1>Suas informações</h1>
      <span className="p-float-label">
        <InputText
          id="name"
          style={{width: '320px'}}
          name='name'
          type='text'/>
        <label htmlFor="name">Nome</label>
      </span>

      <span className="p-float-label">
        <InputText
          id="first_name"
          style={{width: '320px'}}
          name='first_name'
          type='text'/>
        <label
          htmlFor="first_name">
            Primeiro sobrenome
        </label>
      </span>

      <span className="p-float-label">
        <InputText
          style={{width: '320px'}}
          id="last_name"
          name='last_name'
          type='text'/>
        <label
          htmlFor="last_name">
            Ultimo sobrenome
        </label>
      </span>

      <span className="p-float-label">
        <InputText
          style={{width: '320px'}}
          id="cpf"
          name='cpf'
          type='text'/>
        <label
          htmlFor="cpf">
          CPF
        </label>
      </span>

      <span className="p-float-label">
        <InputText
          style={{width: '320px'}}
          id="cellphone"
          name='cellphone'
          type='text'/>
        <label
          htmlFor="cellphone">
            Celular
        </label>
      </span>

      <span className="p-float-label">
        <InputText
          style={{width: '320px'}}
          id="home_address"
          name='home_address'
          type='text'/>
        <label htmlFor="home_address">Endereço</label>
      </span>

      <span className="p-float-label">
        <Calendar
          style={{width: '320px'}}
          value='08/11/1995'
          name='birth'
          inputId="birth"
          dateFormat="dd/mm/yy" />
        <label
          htmlFor="birthbirth_date">
            Data de nascimento
        </label>
      </span>

      <Button
        style={{width: '320px'}}
        size='large'
        loading={loading}
        label={loading?'Concluindo...':'Concluir'} />

      <Button
        style={{width: '320px'}}
        size='large'
        type='button'
        onClick={()=>{push('/')}}
        severity="secondary"
        loading={loading}
        label={'Cancelar'} />

    </form>
  )
}
