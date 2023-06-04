"use client"
import React, { useEffect, useRef, useState } from 'react'



import style from './index.module.css'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';

//PRIME REACT

interface INavbar{
    level: 'User'|'Admin';
    image: string;
}
export default function Navbar({level, image}:INavbar) {
    const [open, setOpen] = useState(false);
    const modalRef = useRef<HTMLUListElement>(null)
    const {push, back} = useRouter();

    function toogle(){
        switch(open){
            case false:
                setOpen(true);        
                break;
            case true:
                setOpen(false);
                break;
        }
    }


  



    useEffect(()=>{
        setOpen(false);
    }, [])


  return (
    <nav className={style.navbar}>
        <Button 
            icon='pi pi-home'
            onClick={()=>{push(level=='Admin'?('/Admin'):('/User'))}}
            severity="info" />


        <div className={style.navbar__user}>
            <img
                src={encodeURI(image)}
                className={style.navbar__userImage}
                alt="imagem do usuario"/>
        </div>
    </nav>
  )
}
