'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname} from 'next/navigation';
import { supabase } from '@modules/supabase/supabase';


import Navbar from '../Navbar';
import LoadingPage from '../LoadingPage';
import NotAllowed from '../NotAllowed';

interface ISecureProps {
  children: React.ReactNode;
}

export default function Secure({ children }: ISecureProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [permission, setPermission] = useState<boolean>(false);
  const [user, setUser] = useState<any>({
    admin: false,
    user: false,
  });

  const {push} = useRouter();
  const pathname = usePathname();

  async function checkToken() {
    const localstore = localStorage.getItem('X3_account_user');

    if(localstore){
      const local = await JSON.parse(localstore);
      if(local){
        setUser(local[0]);
        setPermission(true);
        setLoading(false)
        return
      }
    }

    if(!localstore){
      setPermission(true);
      setLoading(false)
      return
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  if (pathname === '/' || pathname === '/CreateUser') {
    return children;
  }

  if (loading && !permission) {
    return <LoadingPage />;
  }

  if (!permission && !loading) {
    return <NotAllowed />;
  }

  return (
    <>
      <Navbar level={user.admin ? 'Admin' : 'User'} image={user?.picture} />
      {children}
    </>
  );
}
