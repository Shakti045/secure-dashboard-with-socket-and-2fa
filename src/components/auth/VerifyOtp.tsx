import { RootState } from '@/redux/store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { OtpInput } from './OtpInput'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import Loader from '../shared/Loader'
import axios from 'axios'
import { authurls } from '@/lib/urls'
import { useRouter } from 'next/navigation'

const VerifyOtp = ({setStep}:{setStep:(step:number)=>void}) => {
    const {data} = useSelector((state:RootState)=>state.signup);
    const [otp,setotp] = useState("");
    const [loading,setloading] = useState(false);
    const router = useRouter();

    const verifyOtp = async()=>{
        if(otp===null || otp.length<6){
            toast.error('Please enter 6 digit otp')
            return;
        }
        setloading(true);
        try {
           const responce =  await axios.post(authurls.signup,{...data,otp});
            if(responce.status === 200){
                toast.success('Signup successfull');
                router.push("/signin")
            }
        } catch (error:any) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Failed to verify otp');
        }finally{
          setloading(false);
        }
    }
    
  return (
    <div className='max-sm:text-center max-sm:text-base flex flex-col gap-3 items-center'>
      <h1 className='max-sm:text-center max-sm:text-base  font-bold text-2xl'>{`We have sent an otp to ${data?.email}`}</h1>
      <p>Please check in you email and enter the otp below to complete signup process</p>
      <p>If you are unable to find otp in inbox please check your spam folder</p>
      <div className=' flex flex-col items-center mt-8 gap-4'>
      <OtpInput setotp={setotp}/>
      {
        loading?<Loader/>:<Button disabled={loading} onClick={verifyOtp}>Verify</Button>
      }
      </div>
    </div>
  )
}

export default VerifyOtp