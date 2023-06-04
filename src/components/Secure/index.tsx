'use client'
import React, { useEffect, useState } from 'react'
import {usePathname, useRouter} from 'next/navigation'
import Navbar from '../Navbar';
import LoadingPage from '../LoadingPage';
import { supabase } from '@modules/supabase/supabase';
import { contextUSER } from '@modules/context/ctx_user';
import NotAllowed from '../NotAllowed';
import { ICreatingUser } from '@modules/app/CreateUser/page';

interface ISecure{
    children: React.ReactNode;
}
export default function Secure({children}:any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>({});
  const {push} = useRouter();
  const pathname = usePathname();

  async function checkToken(){
    const local = localStorage.getItem('X3_account_user');

    if(local==null){
      console.log('nothing')
      setLoading(false)
      return
    }else{
      const user_data:any = await JSON.parse(local);

      if(user_data){
        console.log('We found something')
        setUser(user_data[0]);
        setLoading(false)
        return
      }

    }



    setLoading(false)
    return
  };


  useEffect(()=>{
    checkToken()
  }, []);

  if(pathname=='/'||pathname=='/CreateUser'){
    return children
  }else{
    return(
      <>

        {pathname!='/' && pathname!='/CreateUser' && loading==true && user.admin==undefined && user.user ==undefined &&(<LoadingPage/>)}
        {loading==false && user.admin==undefined && user.user ==undefined &&(<NotAllowed/>)}
        {loading==false && user.admin==true && user.user==false &&(
          <>
            <Navbar level={'Admin'} image={user?.picture}/>
            {children}
          </>
        )}
  
        {loading==false && user.admin==false && user.user==true &&(
          <>
            <Navbar level={'User'} image={user?.picture}/>
            {children}
          </>
        )}
      </>
    )
  }

}