'use client'

import React, { useState } from 'react'
import style from './index.module.css'
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Tag } from 'primereact/tag';
import ModalRequestAdmin from './ModalRequestAdmin';


export default function RequestItem(product:any) {
  const [visible, setVisible] = useState<boolean>(false)
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
  return (
    <div className={style.item} onClick={()=>{setVisible(true)}} style={{width:'100%'}}>
      <ModalRequestAdmin visible={visible} setVisible={setVisible} id={product.sync}/>
    <span className={style.info}>
      <i className={"pi pi-calendar-plus " + style.icon}/>
      {dateFormat(product.created_at)}
    </span>
    <span className={style.info}>{product.name}</span>
    <span className={style.info}><Tag value={product.status} severity={getSeverity(product)}/></span>
  </div>
  )
}
