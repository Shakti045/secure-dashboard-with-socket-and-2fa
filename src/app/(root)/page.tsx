import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {  getToken, getuserinfo, removeCookie } from '../serveractions/action'
import cookie from 'cookie';
import { redirect } from 'next/navigation'
import Devices from '@/components/dashboard/Devices'
import Logout from '@/components/dashboard/Logout'
import Link from 'next/link'




const Home = async() => {
  const handlelogout = async()=>{
    'use server'
    await removeCookie();
    redirect('/signin');
  }

  const responce = await getuserinfo();
  const token = await getToken();
  if(responce==undefined || !token){
    return <div className=' w-[1oovw] h-[100vh] flex flex-col gap-3 justify-center items-center'>
    <h1 className='font-bold text-3xl text-center'>Your device has been removed</h1>
    <p className=' text-center'>If you want to login kindly logout and login again</p>
     <form action={handlelogout}><Button>Signout</Button></form>
    </div>
  }
  const {data,mydeviceId} = responce;
  
  return (
    <div className=' flex flex-col items-center gap-3'>
      <div className=' p-4 w-full flex justify-between'>
       <p className=' text-2xl'>👋 {data?.username}</p>
       {/* <form action={handlelogout}><Button>Signout</Button></form> */}
       <Logout deviceid={mydeviceId}  token={token}/>
      </div>
     <div className=' flex flex-col gap-3 items-center '>
      <Image src="/security-guard.png" width={200} height={100} alt='security guard image'/>
      <h1 className=' text-2xl font-bold'>Manage Access And Devices</h1>
      <p className=' max-sm:w-[95vw] w-[40vw] text-center'>Theese signed-in devices have recently been active on this account.You can signout any unfamilliar devices or <Link href={'/changepassword'} className=' font-bold  text-green-500'>change your password</Link> for added security.</p>
     </div>
     <Devices deviceid={mydeviceId} logindevices={data?.logindevices || []}/>
    </div>
  )
}

export default Home