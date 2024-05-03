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


const ResetPassword = () => {
    const [loading,setloading] = useState(false);
    const [code,setcode] = useState<string>();
    const [newpassword,setnewpassword] = useState<string>();
    const [confirmnewpassword,setconfirmnewpassword] = useState<string>();
    const [email,setemail] = useState<string>();
    const router = useRouter();
    const resetpassword = async(event:FormEvent<HTMLFormElement>)=>{
        try {
            event.preventDefault();
            if(newpassword !== confirmnewpassword){
                toast.error('Password does not match');
                return;
            }
            setloading(true);
            const responce = await axios.post(userurls.resetpassword,{code,newpassword,confirmnewpassword,email})
            if(responce.status === 200){
                toast.success('Password changed successfully');
            }
            router.push('/signin');
        } catch (error:any) {
            toast.error(error?.response?.data?.message || 'Failed to change password');
        }finally{
            setloading(false);
        }
    };
  return (
    <div className=' w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className=' max-sm:w-[95vw] w-[30vw] rounded-md bg-secondary flex flex-col gap-8 py-5 '>
            <h1 className=' font-bold text-2xl text-center'>Change Password</h1>
            <p className=' p-2 text-center fon'>Hii user!!! For your security reason we want code from your authenticator app.Please enter the code below to reset password</p>
            <form onSubmit={resetpassword} className='w-full flex flex-col gap-5 p-4 items-center'>
            <Input value={code} onChange={(e)=>setcode(e.target.value)} required placeholder='Enter code from your app' type='password' className='w-full p-2  rounded-md'/>
            <Input value={email} onChange={(e)=>setemail(e.target.value)} required placeholder='Enter your email id' type='email' className='w-full p-2  rounded-md'/>
            <Input  value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} required placeholder='Enter your new password' type='password' className='w-full p-2  rounded-md'/>
            <Input value={confirmnewpassword} onChange={(e)=>setconfirmnewpassword(e.target.value)} required placeholder='Confirm your new password' type='password' className='w-full p-2  rounded-md'/>
           {
            loading?<Loader/>:<Button  disabled={loading}>Reset Password</Button>
           }
            </form>
        </div>
    </div>
  )
}

export default ResetPassword