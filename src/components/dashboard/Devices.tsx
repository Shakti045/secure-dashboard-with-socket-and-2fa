'use client'
import React, { useEffect, useState } from 'react'
import DeviceCard from './DeviceCard'
import { socket } from '@/socket'
import { set } from 'date-fns'

const Devices = ({logindevices,deviceid,userid}:{logindevices:[],deviceid:string,userid:string}) => {
  const [devices, setDevices] = useState<any[]>(logindevices);
  // const [isConnected, setIsConnected] = useState(false);
  // const [transport, setTransport] = useState("N/A");
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
    socket.on('new-device',(device:any)=>{
       setDevices([device,...devices]);
    })
    socket.on('remove-device',(deviceid:string)=>{
      setDevices([...devices.filter(device=>device._id!==deviceid)]);
    })
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
 
  return (
    <div className=' w-full  flex justify-center   flex-wrap  gap-4 p-5'>
       {
         devices.map((device:any)=><DeviceCard key={device._id} deviceid={deviceid}  {...device}/>)
       }
     
    </div>
  )
}

export default Devices;