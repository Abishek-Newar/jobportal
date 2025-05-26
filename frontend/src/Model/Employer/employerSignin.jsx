import React from 'react'
import axios from "axios"
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Input } from './JobAdd'
import { BACKEND_URL } from '../../../lib'
const EmployerSignin = ({authType}) => {
    const navigate = useNavigate()
    const [formData,setFormData] = React.useState({
        email: "",
        password: "",
        type: "employer"
    })

    function handleChange(type,e){
        setFormData({
            ...formData,
            [type]: e.target.value
        })
    }
    async function handleSubmit(){
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/signin`,formData)
            toast.success("Signin Successful")
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("username",response.data.name)
            localStorage.setItem("type",response.data.type)
            setTimeout(()=>{
                navigate("/employer/dashboard")
            },2000)
        } catch (error) {
            toast.error("invalid credentials")
            console.log(error)
        }
    }
  return (
    <div className='w-[400px]  p-10 flex flex-col font-primary gap-3 '>
        <Toaster />
        <h1 className='text-center font-logo text-3xl'>SIGN IN</h1>
        <div className='flex flex-col gap-2'>
        <Input type="email" placeholder="example@xyz.com" name="Email" id="email" onChange={(e)=>handleChange("email",e)}  />
        <Input type="password" placeholder="" name="Password" id="password" onChange={(e)=>handleChange("password",e)}  />
        </div>
        <button className='h-10 w-30 bg-[#3A7A64] rounded-[10px] text-[20px] text-white cursor-pointer hover:bg-[#275446] transition duration-300' onClick={handleSubmit}>LOGIN</button>
        <p className='text-secondaryText'>Don't have an account? <a className='underline cursor-pointer hover:text-black' onClick={()=>{authType("signup")}}>Signup</a></p>
    </div>
  )
}

export default EmployerSignin