'use server'
 
import { userurls } from '@/lib/urls';
import axios from 'axios';
import { cookies } from 'next/headers'

 
export async function createCookie(token:string,deviceid:string,userId:string) {
  cookies().set('token', token,{secure:true,expires: new Date(Date.now() + 1000*60*60*24*7)})
  cookies().set('deviceid', deviceid,{secure:true})
  cookies().set('userId', userId,{secure:true})
}

export async function removeCookie() {
  cookies().delete('token')
  cookies().delete('deviceid')
  cookies().delete('userId')
}   

export async function getToken(){
    const cookieStore = cookies();
    return cookieStore.get('token')?.value;
}
export async function getDeviceId(){
  const cookieStore = cookies();
  return cookieStore.get('deviceid')?.value;
}

export async function getallcookieinfo(){
  const cookieStore = cookies();
  return {token:cookieStore.get('token')?.value,deviceId:cookieStore.get('deviceid')?.value,userId:cookieStore.get('userId')?.value}
}
export async function getuserinfo(){
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;
        const responce  = await axios.get(userurls.getinfo,{headers:{Authorization:`Bearer ${token}`}});
     
        if(responce.data.message==="Device has been removed"){
           return null;
        }
        return responce.data?.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}