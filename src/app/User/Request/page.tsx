'use client'

import React, { FormEvent, useRef, useState } from 'react'
import style from './page.module.css'

import {IoClose} from 'react-icons/io5'
import {BiCheck} from 'react-icons/bi'

import { dados, iDados } from './items'
import { supabase } from '@modules/supabase/supabase'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'
export default function Request() {
  const [items, setItems] = useState<any>([]);
  const {push} = useRouter();
  const selectRef = useRef<HTMLSelectElement>(null);


  const dadosOrdenados = dados.sort((a, b) => a.valor.localeCompare(b.valor));

  function addItem(){
    
    if(!selectRef){
      console.error("Não pode ser vazio!");
      return
    }

    if(selectRef.current?.value==""){
      console.error("Não pode ser vazio!");
      return
    }



    setItems((prev:any)=>[...prev, selectRef.current?.value]);
    console.log("adicionado!")
  }


  function removeItem(erased:string){
    const new_items = items.filter((item:string)=>{
      if(item != erased){
        return item;
      }
    });

    setItems(new_items)
  }


  async function submitter(event:FormEvent){
    event.preventDefault();
    const local = localStorage.getItem('X3_account_user');
    if(!local){
      throw new Error("dont't have any data in localstore!");
    }
    const user = await JSON.parse(local);


    const { data, error } = await supabase
    .from('MaterialRequest')
    .insert([
      { items,
        username: 'Wesley Fernandes',
        userid: 'wesley_id',
        condominium: "Alta vista",
        status: 'Em espera',
        completed: true,
        job: "Jardineiro"
      }
    ]).select()


    if(error){
      console.error(`Houve um erro: ${error.message}`);
      return
    }


    console.log('Material foi solicitado!');


    if(data){
      const submited_data:any = data;

      const { data:microData, error:microError } = await supabase
      .from('Micro')
      .insert([
        { 
          local:    user[0].condominium,
          sync:     submited_data[0].id,
          user_id:  user[0].email,
          name:     `${user[0].name} ${user[0].last_name}`,
          status:   'Em espera'
        },
      ]);



      if(microError){
        throw new Error(microError.message);
      }


      console.log('minimal created with sucess!');
      setItems([]);
      return
    }
  

  }
  return (
    <main className={style.main}>
      <form className={style.formulary} onSubmit={submitter}>

        <h1 className={style.formulary__title}>FAZER UM PEDIDO</h1>

        <div className={style.formulary__box}>
          <select
            ref={selectRef}
            name="item"
            className={style.formulary__boxSelect}>
            {dadosOrdenados.map((dados:iDados)=>{
              return(
                <option
                  key={dados.id}
                  value={dados.valor}>
                  {dados.valor}
                </option>
              )
            })}
          </select>
          <Button icon="pi pi-plus" type='button' size='large' onClick={addItem}/>
        </div>

        <ul className={style.formulary__list}>
          {items.map((item:string)=>{
            return(
              <li
                className={style.formulary__item}
                key={item}>
                  <i
                    onClick={()=>{removeItem(item)}}
                    className={"pi pi-times-circle " + style.icon}/>
                  {item}
              </li>
            )
          })}
        </ul>
        <Button
          icon="pi pi-times"
          type='button'
          label='Cancelar'
          severity='danger'
          size='large'
          onClick={()=>{push('/User')}}
          style={{width:'290px'}}/>
        <Button
          icon="pi pi-check"
          label='Concluir'
          type='submit'
          severity='success'
          size='large'
          style={{width:'290px'}}/>
      </form>
    </main>
  )
}
