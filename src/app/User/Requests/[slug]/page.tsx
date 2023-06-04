'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import  {BiBuildingHouse, BiUser} from 'react-icons/bi'
import {BsFillCalendarDateFill, BsClock} from 'react-icons/bs'

import style from './page.module.css'
import { supabase } from '@modules/supabase/supabase'
import { IGetRequest } from '@modules/types/request'

import {format} from 'date-fns'

export default function Page() {
    const [data, setData] = useState<IGetRequest>({
        inserted_at: "2023-11-08T04:50:00.55868+00:00",
        updated_at: "2023-11-08T04:50:00.55868+00:00",
        items: [],
        username: 'carregando...',
        userid: 'carregando...',
        status: 'Em espera',
        adminname: 'carregando...',
        term: 'carregando...',
        completed: false,
        condominium: 'carregando...',
        job: 'carregando...',
        adminResponse: 'carregando...',
    })
    const {slug} = useParams();

  //https://i.insider.com/61a649061a24c800193db1bf?width=700

  async function getData() {
    let { data: request, error } = await supabase
    .from('MaterialRequest')
    .select('*')
    .eq('id', slug);

    if(error){
      throw new Error(`Houve um erro: ${error.message}`);
    }

    if(!request){
      throw new Error(`Sem arquivos!`);
    }

    const any_data:any = request[0];
    const requested_data:IGetRequest = any_data;

    setData(requested_data)
    console.log(requested_data)

  }


  useEffect(()=>{
    getData()
  }, [])

  const format_day  = format(new Date(data.inserted_at), "dd/MM/yyyy");
  const format_hour = format(new Date(data.inserted_at), "HH:mm");
  return (
    <main className={style.main}>
      <header className={style.header}>


        {data.status=="Em espera" &&(
          <div className={style.statusDivEspera}>
          <span className={style.status}>{data.status}</span>
        </div>
        )}

        {data.status=="Aprovado" &&(
          <div className={style.statusDivAprovado}>
          <span className={style.status}>{data.status}</span>
        </div>
        )}

        {data.status=="Reprovado" &&(
          <div className={style.statusDivReprovado}>
          <span className={style.status}>{data.status}</span>
        </div>
        )}


        <div className={style.user}>

          <div className={style.userPicBox}>
            <img
              src="https://i.insider.com/61a649061a24c800193db1bf?width=700"
              alt="Imagem do usuario"
              className={style.userPicture}/>
          </div>
        </div>
      </header>

        <div className={style.condominum}>
        <span className={style.info}>
            <BiUser className={style.svg}/>
            {data.username}
          </span>
          <span className={style.info}>
            <BiBuildingHouse className={style.svg}/>
            {data.condominium}
          </span>
          <span className={style.info}>
            <BsFillCalendarDateFill className={style.svg}/>
            {format_day}
          </span>
          <span className={style.info}>
            <BsClock className={style.svg}/> 11:22h
          </span>
        </div>

        <div className={style.listBox}>
          <h2 className={style.title}>Items solicitados</h2>
          <ul className={style.list}>
            {data.items.map((item:string)=>{
              return(
                <li key={item} className={style.item}>{item}</li>
              )
            })}
          </ul>
        </div>



        <footer className={style.footer}>
          <h2 className={style.title}>Resposta</h2>

            {
              !data.adminResponse?(
              <>
                <span className={style.noAnswer}>
                  Você ainda não obteve resposta, por favor, aguarde.
                </span>
              </>
              ):(
                <div className={style.content}>
                <div className={style.imageBox}>
                  <img
                    src="https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/03/24/967650019-i712230.jpeg"
                    alt="imagem do admin"
                    className={style.image}/>
                </div>
    
                <p className={style.answer}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Et architecto voluptate nemo sint tempora beatae aliquam.
                  Voluptate, quae harum alias eum velit iure architecto libero
                  porro, quos at eaque facilis.
                </p>
              </div>)
            }
              
      </footer>
    </main>
  )
}
