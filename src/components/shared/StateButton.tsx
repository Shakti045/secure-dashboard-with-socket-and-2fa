import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button';
import Loader from './Loader';


const StateButton = ({buttonText}:{buttonText:string}) => {
const status=useFormStatus();
  return (
      <>
      {
        status?.pending?<div className=' w-full h-full flex justify-center items-center'><Loader/></div>
        :<Button aria-disabled={status?.pending} type="submit">{buttonText}</Button>
      }
      </>
  )
}

export default StateButton
