'use client'
import React, { FormEvent, useState } from "react";
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from "primereact/dropdown";

import style from './style.module.css'
import { supabase } from "@modules/supabase/supabase";

interface IModal{
    email:string;
}

interface IOptions{
    name: string;
    code: number;
}
export default function ModalToAprove({email}:IModal) {
    const [visible, setVisible] = useState(false);
    const [level, setLevel] = useState<IOptions>({name: '', code:0});
    const [condominium, setCondominium] = useState<IOptions>({name: '', code:0});
    const [job, setJob] = useState<IOptions>({name: '', code:0});

    const optionsLevel = [
        {name: 'Administrador', code: 1},
        {name: 'Usuario',  code: 2},
    ];

    const optionsCondominium = [
        {name: 'X3', code: 1},
        {name: 'Alta vista', code: 2},
        {name: 'Beverly Hills',  code: 3},
        {name: 'Garden club house',  code: 4},
    ];

    const optionsJob = [
        {name: 'Administrador', code: 1},
        {name: 'Zelador(a)', code: 2},
        {name: 'Faxineiro(a)',  code: 3},
        {name: 'Porteiro(a)',  code: 4},
    ];


    async function submit(e:FormEvent){
        e.preventDefault();


        if(!condominium || !level || !job){
            throw new Error('Missing informations!');
        }

        const { data, error } = await supabase
        .from('User')
        .update(
            { 

                admin:  level.name=='Administrador'?(true):(false),
                user:   level.name=='Usuario'?(true):(false),
                status: true,
                job: job.name,
                condominium: condominium.name
            }).eq('email', email);

        if(error){
            throw new Error(error.message);
        }


        console.log('Usuario atualizado com sucesso!');
        setVisible(false);
    }
  return (
    <div className={"card flex justify-content-center " + style.button}>
        <Button label="Gerenciar" icon="pi pi-cog" onClick={() => setVisible(true)} />
        <Dialog
        header="Moderar usuario"
        visible={visible}
        className={style.modal}
        onHide={() => setVisible(false)}>
        <h3 className="mt-3">{email}</h3>
        <form onSubmit={submit}>
            <span className="p-float-label mt-5 mb-2">
                <Dropdown
                    value={level}
                    onChange={(e) => setLevel(e.value)}
                    options={optionsLevel}
                    optionLabel="name"
                    inputId="level"
                    key={'level'}
                    placeholder="Selecione o level"
                    className="w-full md:w-14rem" />
                <label htmlFor="level">Selecione o level</label>
            </span>

            <span className="p-float-label mt-5 mb-2">
                <Dropdown
                    value={condominium}
                    onChange={(e) => setCondominium(e.value)}
                    options={optionsCondominium}
                    key={'cond'}
                    inputId="condominium"
                    optionLabel="name"
                    placeholder="Selecione o condominio"
                    className="w-full md:w-14rem" />
                <label htmlFor="condominium">Selecione o local</label>
            </span>

            <span className="p-float-label mt-5 mb-2">
                <Dropdown
                    value={job}
                    onChange={(e) => setJob(e.value)}
                    options={optionsJob}
                    inputId="condominium"
                    optionLabel="name"
                    key={"Job"}
                    placeholder="Selecione o cargo"
                    className="w-full md:w-14rem" />
                <label htmlFor="condominium">Selecione o cargo</label>
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
