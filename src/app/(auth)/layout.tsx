import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' w-[100vw] h-[100vh] flex justify-center items-center'>
        {children}
    </div>
  )
}

export default AuthLayout