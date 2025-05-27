import  { useState } from 'react'
import EmployerSignup from '../../Model/Employer/emoplyerSignup'
import EmployerSignin from '../../Model/Employer/employerSignin'


const EmployerAuth = () => {
    const [authType,setAuthType] = useState("signup")
  return (
    <div className='  flex '>
        <div className='w-[40vw] min-h-screen bg-center hidden md:block' style={{backgroundImage: `url("https://img.freepik.com/free-photo/working-dark-room_1098-12825.jpg?t=st=1748327996~exp=1748331596~hmac=f11382cb5ac832568dd7916c8b1fb49be5725cc02f12a37ee735f8375f31f608&w=1380")`,backgroundSize:"cover"}}></div>
        <div className='w-full md:w-[60vw] min-h-screen flex justify-center items-center'>
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