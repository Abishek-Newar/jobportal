import React from 'react'
import { toast, Toaster } from 'sonner'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Input } from './JobAdd'
import { BACKEND_URL } from '../../../lib'

const EmployerSignup = ({authType}) => {
    const navigate = useNavigate()
    const [formData,setFormData] = React.useState({
        name: "",
        email: "",
        type: "employer",
        password: ""
    })

    function handleChange(type,e){
        setFormData({
            ...formData,
            [type]: e.target.value
        })
    }
    async function handleSubmit(){
        const data = {
            ...formData,
            phone: parseInt(formData.phone)
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/signup`,data)
            toast.success("Signup Successful")
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
    <div className='w-[400px] flex flex-col gap-3 font-primary p-10'>
        <h1 className='font-logo text-center text-3xl'>SIGN UP</h1>
        <div className='flex flex-col gap-2'>
        <Input type="text" placeholder="John Doe" name="Name" id="name" onChange={(e)=>handleChange("name",e)}  />
        <Input type="email" placeholder="john@gmail.com" name="Email" id="email" onChange={(e)=>handleChange("email",e)}  />
        <Input type="password" placeholder="" name="Password" id="password" onChange={(e)=>handleChange("password",e)}  />
        </div>
        <button className=' bg-orange-400 h-10 rounded-lg text-white text-bold' onClick={handleSubmit}>Sign Up</button>
        <p className='text-secondaryText'>Don't have a account? <a className='underline hover:text-black cursor-pointer' onClick={()=>{authType("signin")}}>Signin</a></p>
        <Toaster />
    </div>
  )
}

export default EmployerSignup