'use server'
 
import { userurls } from '@/lib/urls';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'


 
export async function createCookie(token:string) {
  cookies().set('token', token,{secure:true,expires: new Date(Date.now() + 1000*60*60*24*7)})
}

export async function removeCookie() {
  cookies().delete('token')
}   

export async function getToken(){
    const cookieStore = cookies();
    return cookieStore.get('token')?.value;
}

export async function getuserinfo(){
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const responce  = await axios.get(userurls.getinfo,{headers:{Authorization:`Bearer ${token}`}});
    if(responce.data.message==="Device has been removed"){
      return undefined; 
    }
    // revalidatePath("/");
    return {data:responce?.data?.data,mydeviceId:responce.data?.mydeviceId};
  } catch (error) {
    return null;
  }
}
