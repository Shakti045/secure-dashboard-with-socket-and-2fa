'use client'
import React, { useEffect, useState } from 'react'
import DeviceCard from './DeviceCard'
import { socket } from '@/socket'
import { useRouter } from 'next/navigation'
import { removeCookie } from '@/app/serveractions/action'

type Device = {
  devicetype:string,
  os:string,
  version:string,
  clientname:string,
  _id:string,
  timeoflogin:string,
  clienttype:string,
  ip:string,
}
const Devices = ({logindevices,deviceid,userid}:{logindevices:Device[],deviceid:string,userid:string}) => {
  const [devices, setDevices] = useState<Device[]>(logindevices);
  // const [isConnected, setIsConnected] = useState(false);
  // const [transport, setTransport] = useState("N/A");
  const router = useRouter();

  const logout = async () => {
    await removeCookie();
    router.push('/signin');
  }
  useEffect(() => {
    if (socket.connected) {
        onConnect();
    }

    function onConnect() {
      // setIsConnected(true);
      // setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        // setTransport(transport.name);
      });
    }

    function onDisconnect() {
      // setIsConnected(false);
      // setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.emit('join',userid);
    // socket.emit('joindevice',deviceid);
    socket.on('new-device',(device:Device)=>{
       setDevices([device,...devices]);
    })
    socket.on('remove-device',(did:string)=>{
      if(did==deviceid){
           logout();
        }
      setDevices([...devices.filter(device=>device._id!==did)]);
    })
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [deviceid,userid]);
 
  return (
    <div className=' w-full  flex justify-center   flex-wrap  gap-4 p-5'>
       {
         devices.map((device:Device)=><DeviceCard key={device._id} deviceid={deviceid}  {...device}/>)
       }
     
    </div>
  )
}

export default Devices;