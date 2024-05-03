import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { getallcookieinfo, getuserinfo, removeCookie } from '../serveractions/action'

import { redirect } from 'next/navigation'
import Devices from '@/components/dashboard/Devices'
import Logout from '@/components/dashboard/Logout'
import Link from 'next/link'


const page = async() => {
  const responce = await getuserinfo();
  const {deviceId,userId,token} = await getallcookieinfo();
  const handlelogout = async()=>{
    'use server'
    await removeCookie();
    redirect('/signin');
  }

  if(responce==null || !deviceId || !userId || !token) {
     return <div className=' w-full h-[100vh] font-bold text-2xl justify-center items-center flex flex-col gap-3'>
       <p>Your device has been removed!!</p>
       <p>Kindly logout and login again </p>
       <form action={handlelogout}><Button>Signout</Button></form>
     </div>
  }
  
  return (
    <div className=' flex flex-col items-center gap-3'>
      <div className=' p-4 w-full flex justify-between'>
       <p className=' text-2xl'>👋 {responce?.username}</p>
       {/* <form action={handlelogout}><Button>Signout</Button></form> */}
       <Logout deviceid={deviceId} token={token}/>
      </div>
     <div className=' flex flex-col gap-3 items-center '>
      <Image src="/security-guard.png" width={200} height={100} alt='security guard image'/>
      <h1 className=' text-2xl font-bold'>Manage Access And Devices</h1>
      <p className=' max-sm:w-[95vw] w-[40vw] text-center'>Theese signed-in devices have recently been active on this account.You can signout any unfamilliar devices or <Link href={'/changepassword'} className=' font-bold  text-green-500'>change your password</Link> for added security.</p>
     </div>
     <Devices deviceid = {deviceId} userid= {userId}  logindevices={responce?.logindevices || []}/>
    </div>
  )
}

export default page