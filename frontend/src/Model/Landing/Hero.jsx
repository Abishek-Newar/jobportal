import React from 'react'
import styles from "./landing.module.css"
 function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.parah2}>"Choose a job you love, and you will never have to work a day in  your life"</h2>
        <button className={styles.btn}>Find jobs</button>
      </div>
    </div>
  )
}
export default Hero
