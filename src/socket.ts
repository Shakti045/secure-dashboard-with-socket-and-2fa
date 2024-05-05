'use client'

import { io } from 'socket.io-client';
import { getToken } from './app/serveractions/action';



const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
export const connectSocket = async () => {
    try {
    const  token  = await getToken();
     const socket = io(backendUrl,{
        auth:{
            token
        }
     });
     return socket;
    } catch (error) {
        console.log("Failed to connect to socket server");
        throw new Error("Failed to connect to socket server");
    }
};