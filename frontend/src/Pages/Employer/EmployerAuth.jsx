import  { useState } from 'react'
import EmployerSignup from '../../Model/Employer/emoplyerSignup'
import EmployerSignin from '../../Model/Employer/employerSignin'


const EmployerAuth = () => {
    const [authType,setAuthType] = useState("signup")
  return (
    <div className='  flex '>
        <div className='w-[40vw] min-h-screen' style={{backgroundImage: `url("/public/bg2.jpg")`,backgroundSize:"cover"}}></div>
        <div className='w-[60vw] min-h-screen flex justify-center items-center'>
            {
                authType === "signup"?
                <EmployerSignup authType = {setAuthType} />
                :
                <EmployerSignin authType = {setAuthType} />
            }
        </div>
    </div>
  )
}

export default EmployerAuth