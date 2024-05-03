'use client'

import { removeCookie } from "@/app/serveractions/action";
import { Button } from "../ui/button"
import { useState } from "react";
import Loader from "../shared/Loader";
import axios from "axios";
import { userurls } from "@/lib/urls";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const Logout = ({deviceid,token}:{deviceid:string,token:string}) => {
    const [loading,setloading] = useState(false);
    const router = useRouter();
const logout = async () => {
    try {
        setloading(true);
        await axios.delete(`${userurls.removedevice}/${deviceid}`,{headers:{Authorization:`Bearer ${token}`}})
        await removeCookie();
        router.push('/signin');
    } catch (error) {
        toast.error('Failed to logout');
    }finally{
        setloading(false);
    }
  };
  return (
    <>
     {
        loading?<Loader/>:<Button disabled={loading} onClick={logout}>Sign out</Button>
     }
    </>
  )
}

export default Logout