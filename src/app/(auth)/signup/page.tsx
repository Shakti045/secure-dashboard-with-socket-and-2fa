'use client'
import SignupDetails from "@/components/auth/SignupDetails"
import VerifyOtp from "@/components/auth/VerifyOtp";
import { useState } from "react"

const SignUp = () => {
 const [step,setStep] = useState(1);
  return (
     <>
      {
        step === 1 ? <SignupDetails setStep={(step:number)=>setStep(step)}/>:<VerifyOtp setStep={(step:number)=>setStep(step)}/>
      }
     </>
  )
}

export default SignUp