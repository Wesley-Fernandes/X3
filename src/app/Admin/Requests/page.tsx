'use client'
import React, { FormEvent, useEffect, useState } from 'react'

import RequestItem from '@modules/components/RequestItem';
import style from './page.module.css'

//REACT PRIME
import {SelectButton} from 'primereact/selectbutton'
import { DataView } from 'primereact/dataview'
import { supabase } from '@modules/supabase/supabase';

interface IOptions{
    name: string;
    value: number;
}
export default function Requests() {
    const [requests, setRequests] = useState<any>([]);
    const [option, setOption] = useState<IOptions>({name: '', value: 0});

    const items = [
        { name: 'Aprovado',     value: 'Aprovado'},
        { name: 'Reprovado',    value: 'Reprovado'},
        { name: 'Em espera',    value: 'Em espera'}
    ];;

    async function fetchData(params:string) {
        let { data: micro, error } = await supabase
        .from('Micro')
        .select("*")
        .eq('status', params);


        if(error){
            throw new Error(error.message);
        }


        setRequests(micro)
        console.log('Data has been fetched!')
        console.log(option.name)
        console.log(micro)
    }

  return (
    <div className={style.page}>
        <div className={style.header}>
            <SelectButton
            value={option}
            onChange={(e) => fetchData(e.value)}
            optionLabel="name"
            options={items}/>
        </div>
        <main className={style.main}>
            <DataView value={requests} itemTemplate={RequestItem} />
        </main>
    </div>
  )
}
