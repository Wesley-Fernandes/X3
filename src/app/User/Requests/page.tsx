'use client'

//NEXT JS
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import style from './page.module.css'

//SUPABASE
import { supabase } from '@modules/supabase/supabase';

//DATE-FNS
import { format } from 'date-fns';


//PRIME REACT
import {Tag} from 'primereact/tag'
import { DataView} from 'primereact/dataview'



export default function Requests() {
  const [items, setItems] = useState<any>([]);

  async function getData(){
    let { data: requests, error } = await supabase
    .from('MinimalMaterialRequest')
    .select('*');


    if(error){
      console.error(`Houve um erro: ${error.message}`);
      return
    }

    if(!requests){
      console.error(`Houve um erro desconhecido!`);
      return
    }


    console.log('Dados recuperados com suceso!');
    console.log(requests)

    setItems(requests);
  }
  



  useEffect(()=>{
    getData();
  }, [])
  return (
    <main className={style.main}>
      <DataView value={items} itemTemplate={listTemplateItem} style={{width:'100%'}}  rows={10}/>
    </main>
  )
}


function listTemplateItem(product:any){
  const {push} = useRouter();

  function dateFormat(data:any):string{
    const format_day  = format(new Date(data), "dd/MM/yyyy");
    const format_hour = format(new Date(data), "HH:mm");

    return format_day
  }

  function getSeverity(status:string){
    switch (status){
      case 'Em espera':
        return 'info';
      case 'Reprovado':
        return 'danger';
      case 'Aprovado':
        return 'success';
    }
  }

  return(
    <div className={style.item} onClick={()=>{push(`/User/Requests/${product.id}`)}}>
      <span className={style.info}>
        <i className={"pi pi-calendar-plus " + style.icon}/>
        {dateFormat(product.created_at)}
      </span>
      <span className={style.info}>{product.condominium}</span>
      <span className={style.info}><Tag value={product.status} severity={getSeverity(product)}></Tag></span>
    </div>
  )
}
