'use client'
import React, { useEffect, useState } from 'react'
import DeviceCard from './DeviceCard'
import { connectSocket } from '@/socket'
import { useRouter } from 'next/navigation'
import { removeCookie } from '@/app/serveractions/action'
import toast from 'react-hot-toast'

type Device = {
  devicetype:string,
  os:string,
  version:string,
  clientname:string,
  _id:string,
  timeoflogin:number,
  clienttype:string,
  ip:string,
}
const Devices = ({logindevices,deviceid}:{logindevices:Device[],deviceid:string}) => {
  const [devices, setDevices] = useState<Device[]>(logindevices);
  const [skt,setskt] = useState<any>(null);
  // const [isConnected, setIsConnected] = useState(false);
  // const [transport, setTransport] = useState("N/A");
  const router = useRouter();

  const logout = async () => {
    await removeCookie();
    router.push('/signin');
  }
  
  const initialiseSocket = async () => {
    try {
      const socket = await connectSocket();
      socket.on('new-device',(device:Device)=>{
        setDevices([device,...devices]);
      })
    
      socket.on('remove-device',(did:string)=>{
        if(did===deviceid) {
          logout();
          return;
        }
        const updated_devices = devices.filter(device=>device._id!==did);
        setDevices([...updated_devices]);
      })
      setskt(socket);
    } catch (error) {
      toast.error('Failed to connect to socket server');
    }
  }

  useEffect(() => {
    initialiseSocket();
    return () => {
      skt?.disconnect();
    }
  }, []);
 
  return (
    <div className=' w-full  flex justify-center   flex-wrap  gap-4 p-5'>
       {
         devices.map((device:Device)=><DeviceCard key={device._id} deviceid={deviceid}  {...device}/>)
       }
     
    </div>
  )
}

export default Devices;