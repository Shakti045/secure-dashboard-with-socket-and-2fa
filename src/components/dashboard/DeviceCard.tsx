'use client'
import { Clock, Globe, Monitor, Network, Smartphone } from 'lucide-react';
import {format} from 'date-fns';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { getToken } from '@/app/serveractions/action';
import axios from 'axios';
import { userurls } from '@/lib/urls';
import Loader from '../shared/Loader';
import toast from 'react-hot-toast';

 type deviceCardProps = {
  devicetype:string,
  os:string,
  version:string,
  clientname:string,
  _id:string,
  timeoflogin:number,
  clienttype:string,
  ip:string,
  deviceid:string
}
const DeviceCard = ({devicetype,os,version,clientname,_id,timeoflogin,clienttype,ip,deviceid}:deviceCardProps) => {
   const [loading,setloading] = useState(false);
   const removedevice =  async()=>{
    setloading(true);
     try {
        const token = await getToken();
        if(!token) return;
        await axios.delete(`${userurls.removedevice}/${_id}`,{headers:{Authorization:`Bearer ${token}`}})
        toast.success('Device removed successfully');
      } catch (error) {
        console.log(error)
        toast.error('Failed to remove device');
      }finally{
        setloading(false);
      
      }
   }
  return (
    <div className=' max-sm:w-[95vw] w-[30vw] h-[30vh] flex flex-col justify-between font-bold p-3 rounded-md bg-secondary-foreground text-secondary'>
       {
        loading?<div className=' w-full h-full flex justify-center items-center'>
          <Loader></Loader>
        </div>:(<>
         <div className=' border-b-[1px]  border-slate-500 pb-3 w-full flex justify-between items-center'>
        <div className=' flex gap-2 items-center '>
            {
                devicetype==='smartphone'?<Smartphone size={25}/>:<Monitor size={25}/>
            }
            <p>{os} {version}</p>
        </div>
        {
          deviceid !== _id?<Button onClick={removedevice} className=' bg-secondary  hover:bg-red-500 text-secondary-foreground'>Sign out</Button>:<p className=' text-green-600 p-2 rounded-md'>This Device</p>
        }
        </div>
        <p className=' flex gap-2 items-center'><Globe/> {clientname} {clienttype}</p>
        <p className=' flex gap-2 items-center'><Network/>{ip}</p>
        <p className=' flex gap-2 items-center'><Clock/>{format(new Date(new Date(timeoflogin)), "hh:mm  - yyyy/MM/dd  ")}</p>
        </>)
       }
    </div>
  )
}

export default DeviceCard;