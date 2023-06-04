'use client'
import React, { FormEvent, useState } from "react";
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from "primereact/dropdown";
import {InputTextarea} from 'primereact/inputtextarea'

import style from './style.module.css'
import { supabase } from "@modules/supabase/supabase";
import { error } from "console";

interface IModal{
    visible: boolean;
    setVisible: (arg:boolean)=>void;
    id: number;
}

interface IOptions{
    name: string;
    code: number;
}
export default function ModalRequestAdmin({setVisible, visible, id}:IModal) {
    const [option, setOption] = useState<IOptions>({name: '', code:0});


    const optionsStatus = [
        {name: 'Aprovado', code: 1},
        {name: 'Reprovado', code: 2},
        {name: 'Em espera',  code: 3},
    ];


    async function submit(e:FormEvent){
        e.preventDefault();

        const target = e.target as typeof e.target & {
            comment: {value: string}
        }

        const comment = target.comment.value;

        if(!option.name){
            throw new Error('Name missing!');
        }





    
        setVisible(false);
    }
  return (
    <div className={"card flex justify-content-center " + style.button}>
        <Dialog
            header="Moderar usuario"
            visible={visible}
            className={style.modal}
            onHide={() => setVisible(false)}>
        <form onSubmit={submit}>
            <h3>Alta vista</h3>

            <span className="p-float-label mt-5 mb-2">
                <Dropdown
                    value={option}
                    onChange={(e) => setOption(e.value)}
                    options={optionsStatus}
                    inputId="option"
                    optionLabel="name"
                    key={"option"}
                    placeholder="Selecione o cargo"
                    className="w-full md:w-14rem" />
                <label htmlFor="condominium">Modificar o status</label>
            </span>

            <span className="p-float-label mt-5 mb-2">
                <InputTextarea id="comment" rows={5} cols={30}  style={{width: '100%'}}/>
                <label htmlFor="comment">Fazer um comentario</label>
            </span>



            <Button
                icon="pi pi-envelope"
                className="mt-3"
                style={{width: '100%'}}
                type="submit"
                label="Concluir"
                size="large"/>
        </form>
        </Dialog>
    </div>
  )
}
