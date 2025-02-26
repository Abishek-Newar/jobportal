import React from 'react'
import SignIn from '../../Model/user/SignIn/Signin'
import Signup from '../../Model/user/SignUp/Signup'
import { useState } from 'react'
import styles from './auth.module.css'
import Navbar from '../../components/Navbar'
import Hero from '../../Model/Landing/Hero'

const Auth = () => {
  const [type,setType] = useState("signup")
  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridChild1}>
      <div className={styles.gridChild2}>
        <h1>"The customer support I received was exceptional. The support team went above and beyond to address my concerns"</h1>
        <h4 className={styles.heading4}>Aiman Qadree</h4>
        <p className={styles.para}>CEO | SKILLMATCH</p>
      </div>
      </div>
      <div className={styles.gridChild1}>
      {
        type === "signup"?
        <Signup setType={setType} />:
        <SignIn setType={setType} />
        
      }
    </div>
    </div>
  )
}

export default Auth



