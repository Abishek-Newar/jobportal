import axios from "axios"
import styles from "./signup.module.css"
import { useState } from "react"
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../../../lib"

function Signup({ setType }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()
  // const [data,setData] = useState({
  //     email: "",
  //     password: "",
  //     name: ""
  // })

  // function handleChange(label,e){
  //     setData({
  //         ...data,
  //         [label]: e.target.value
  //     })
  // }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
        email: email,
        password: password,
        name: name,
        type: "user",
      })
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("name", response.data.name)
      localStorage.setItem("type", response.data.type)
      toast.success("SignUp succesfull")
      setTimeout(() => {
        navigate("/signup/personal-details")
      }, 2000)
    } catch (error) {
      toast.error("error")

    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.top}>Create an account</h1>

      <label className={styles.labels}>Name</label>
      <input className={styles.inputs} type="text" onChange={(e) => setName(e.target.value)} />

      <label className={styles.labels}>Email</label>
      <input className={styles.inputs} type="text" placeholder="aiman@gmail.com" onChange={(e) => setEmail(e.target.value)} />

      <label className={styles.labels}>Password</label>
      <input className={styles.inputs} type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className={styles.btn} type="submit">Signup</button>
      <p>Already have an account? <span className={styles.p} onClick={() => setType("signin")}>Sign in</span></p>
      <Toaster />


    </form>
  )
}
export default Signup