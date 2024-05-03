'use client'
import Authenticate from '@/components/auth/Authenticate'
import StateButton from '@/components/shared/StateButton'
import { Input } from '@/components/ui/input'
import { authurls } from '@/lib/urls'
import axios from 'axios'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'



const SignIn = () => {
   const [signindata,setsignindata] = useState(null);
    const login = async()=>{
        try {
          const responce = await axios.post(authurls.signin,{email,password});
          if(responce.status === 200){
            toast.success('Password verified');
            setsignindata(responce.data);
          }
        } catch (error:any) {
          console.log(error)
          toast.error(error?.response?.data?.message || 'Failed to login');
        }
    }

    const [state, formAction] = useFormState(login , undefined);
    const [email,setemail] = useState<string | null>();
    const [password,setpassword] = useState<string | null>();

    
  return (
    <div className=' max-sm:w-[95vw] w-[30vw]  rounded-md bg-secondary flex flex-col gap-3 py-5 '>
        {
          signindata?<Authenticate setsignindata={setsignindata} signindata = {signindata}/>:(
           <>
            <h1 className=' font-bold text-2xl text-center'>Welcome back!</h1>
            <h1 className=' font-bold text-2xl text-center border-b-[0.5px] border-secondary-foreground pb-2'>Login to your account</h1>
            <form action={formAction} className='w-full flex flex-col gap-3 p-4 items-center'>
            <Input required onChange={(e:ChangeEvent<HTMLInputElement>)=>setemail(e.target.value)} placeholder='Enter your email address'/>
            <Input required onChange={(e:ChangeEvent<HTMLInputElement>)=>setpassword(e.target.value)} placeholder=' Enter your password'/>
            <StateButton buttonText='Sign In'/>
            <Link href={'/signup'}>Do not have a account ? Go to signup</Link>
            <Link className=' text-green-600' href={'/resetpassword'}>Reset password</Link>
            </form>
           </>
         )
        }
    </div>
  )
}

export default SignIn;