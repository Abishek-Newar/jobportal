import React from 'react'
import styles from  "./navbar.module.css"
import {useNavigate} from "react-router-dom"
 function Navbar() {
  const navigate = useNavigate()
  return (
    <div>
      <nav className={styles.Navbar}>
        <div>
          <h3 className={styles.logo}>SKILLMATCH</h3>
        </div>
        {
          localStorage.getItem("token") && localStorage.getItem("type") === "user"?
         <div className='flex gap-4'> 
          <button onClick={()=>{navigate("/my-applications")}} className="text-white">My Applications</button>
          <button onClick={()=>{navigate("/user-profile")}} className="text-white ">My Profile</button>
          <button onClick={()=>{localStorage.clear();window.location.reload()}} className={styles.btn}>Logout</button>
          </div>:
          <button onClick={()=>{navigate("/auth")}} className={styles.btn}>Login</button>
        }
      </nav>
    </div>
  )
}
export default Navbar
