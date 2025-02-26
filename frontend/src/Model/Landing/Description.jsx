import React from 'react'
import { MdOutlineImageSearch } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import styles from './landing.module.css'
function Description() {
  return (
    <div className= {styles.topdescription}>
        <h1 className= {styles.headingdescription}>What's <span className={styles.insidedescription}>inside?</span></h1>
        <h4 className= {styles.paradescription}>Nah, not another job-portal. It's beyond that.</h4>

        <div className={styles.parentdescription}>
            <div className={styles.boxdescription}> 
                <MdOutlineImageSearch className={styles.icon1}/>
                <h3 className={styles.top2description}>Find Job</h3>
                <p className={styles.para2description}>Finding a job can be both exciting and challenging. It often requires a blend of research, networking, and persistence. Start by identifying your strengths and interests, and tailor your resume to reflect your skills. </p>
            </div>

            <div className={styles.boxdescription}>
            <MdOutlinePostAdd className={styles.icon1}/>
                <h3 className={styles.top2description}>Post Jobs</h3>
                <p className={styles.para2description}>Posting jobs effectively is key to attracting the right talent. Start by creating clear, concise job descriptions that highlight key responsibilities, required skills, and qualifications. </p>
            </div>
        </div>
    </div>
  )
}
export default Description
