'use client'
import { getToken } from '@/app/serveractions/action'
import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { userurls } from '@/lib/urls'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'


const ChangePassword = () => {
    const [loading,setloading] = useState(false);
    const [oldpassword,setoldpassword] = useState<string>();
    const [newpassword,setnewpassword] = useState<string>();
    const [confirmnewpassword,setconfirmnewpassword] = useState<string>();
    const router = useRouter();
    const changepassword = async(event:FormEvent<HTMLFormElement>)=>{
        try {
            event.preventDefault();
            if(newpassword !== confirmnewpassword){
                toast.error('Password does not match');
                return;
            }
            setloading(true);
            const token = await getToken();
            const responce = await axios.post(userurls.changepassword,{oldpassword,newpassword,confirmnewpassword},{headers:{Authorization:`Bearer ${token}`}});
            if(responce.status === 200){
                toast.success('Password changed successfully');
            }
            router.push('/');
        } catch (error:any) {
            toast.error(error?.response?.data?.message || 'Failed to change password');
        }finally{
            setloading(false);
        }
    };
  return (
    <div className=' w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className=' max-sm:w-[95vw] w-[30vw] rounded-md bg-secondary flex flex-col gap-3 py-5 '>
            <h1 className=' font-bold text-2xl text-center'>Change Password</h1>
            <form onSubmit={changepassword} className='w-full flex flex-col gap-5 p-4 items-center'>
            <p className=' text-center'>Embrace the power of transformation. Resetting your password is not just about security; it is about unlocking new beginnings and embracing the journey of change.</p>
            <Input value={oldpassword} onChange={(e)=>setoldpassword(e.target.value)} required placeholder='Enter your old password' type='password' className=' mt-8 w-full p-2  rounded-md'/>
            <Input  value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} required placeholder='Enter your new password' type='password' className='w-full p-2  rounded-md'/>
            <Input value={confirmnewpassword} onChange={(e)=>setconfirmnewpassword(e.target.value)} required placeholder='Confirm your new password' type='password' className='w-full p-2  rounded-md'/>
           {
            loading?<Loader/>:<Button  disabled={loading}>Change Password</Button>
           }
            </form>
        </div>
    </div>
  )
}

export default ChangePassword