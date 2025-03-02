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
          <button onClick={()=>{localStorage.clear()}} className={styles.btn}>Logout</button>:
          <button onClick={()=>{navigate("/auth");window.location.reload()}} className={styles.btn}>Login</button>
        }
      </nav>
    </div>
  )
}
export default Navbar
