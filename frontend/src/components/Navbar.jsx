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
        <button onClick={()=>{navigate("/auth")}} className={styles.btn}>Login</button>
      </nav>
    </div>
  )
}
export default Navbar
