import React from 'react'
import styles from "./landing.module.css"
import { useNavigate } from 'react-router-dom'
 function Hero() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.parah2}>"Choose a job you love, and you will never have to work a day in  your life"</h2>
        <button className={styles.btn} onClick={()=>{navigate("/jobs")}} >Find jobs</button>
      </div>
    </div>
  )
}
export default Hero
