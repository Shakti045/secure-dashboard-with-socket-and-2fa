'use client'
import React, { ChangeEvent, useState } from 'react'
import { Input } from '../ui/input'
import StateButton from '../shared/StateButton'
import toast from 'react-hot-toast'
import { useFormState } from 'react-dom'
import { setSignupData, signupdata } from '@/redux/slice/signupslice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import axios from 'axios'
import { authurls } from '@/lib/urls'


const SignupDetails = ({setStep}:{setStep:(step:number)=>void}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [data,setData] = useState<signupdata>({username:'',email:'',password:'',confirmPassword:''});
    
    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setData({...data,[event.target.name]:event.target.value})
    }
    
    const getOtp = async ()=>{
        if(data.password!==data.confirmPassword){
            toast.error('Password mismatched')
            return;
        }
        const loadingtoastId = toast.loading('Sending OTP');
        try {
            const responce = await axios.post(authurls.getotp,{email:data.email});
            if(responce.status === 200){
                toast.success('OTP sent successfully')
                dispatch(setSignupData(data));
                setStep(2)
            }
         } catch (error:any) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Failed to send otp');
         }finally{
            toast.dismiss(loadingtoastId)
         }
    };

    const [state, formAction] = useFormState(getOtp , undefined);
  return (
    <div className='max-sm:w-[95vw] w-[30vw]  rounded-md bg-secondary flex flex-col gap-3'>
        <h1 className=' font-bold text-2xl text-center'>Welcome!</h1>
       
        <h1 className=' font-bold text-2xl text-center border-b-[0.5px] border-secondary-foreground pb-2'>Create your account</h1>
        
        <form  action={formAction} className=' w-full flex flex-col gap-3 p-4'>
        <Input type='email' required name='email' onChange={handleChange} placeholder='Enter your mail id'/>
        <Input type='text' required name='username' onChange={handleChange} placeholder='Enter your username'/>
        <Input type='password' required name='password' onChange={handleChange} placeholder='Enter your password'/>
        <Input type='password' required name='confirmPassword' onChange={handleChange} placeholder='Confirm your password'/>
        <StateButton buttonText='Sign In'/>
        </form>
     </div>
  )
}

export default SignupDetails