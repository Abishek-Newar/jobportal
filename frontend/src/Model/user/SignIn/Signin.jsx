import styles from  "./signin.module.css"
import { useState } from "react"
import axios from "axios" 
import {toast,Toaster} from "sonner"
import { useNavigate } from "react-router-dom"

function SignIn({setType}){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    // const [data,setData] = useState({
    //     email: "",
    //     password: ""
    // })

    // function handleChange(label,e){
    //     setData({
    //         ...data,
    //         [label]: e.target.value
    //     })
    // }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:3000/v1/auth/signin",{
                email: email,
                password: password,
                type: "user"
            })
            toast.success("Login succesful") 
            setTimeout(()=>{
                 navigate("/")
            },2000)
        }catch(error){
            console.log(error)
            toast.error("error")
        }
    }
    return(
   <form className={styles.form} onSubmit={handleSubmit}>
    <h1 className={styles.top}>Login to your account</h1>

    <label className={styles.labels}>Email</label>
    <input className={styles.inputs} type="text" placeholder="aiman@gmail.com" onChange={(e)=>setEmail(e.target.value)} />

    <label className={styles.labels}>Password</label>
    <input className={styles.inputs} type="password"  onChange={(e)=>{setPassword(e.target.value);console.log(e)}} />
    <button className={styles.btn} type="submit">Login</button>
    <p>Don't have an account? <span className={styles.p} onClick={()=>setType("signup")}>Sign Up</span></p>
    <Toaster/>
   </form>
    )
}
export default SignIn