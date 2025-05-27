import React from 'react'
import styles from './landing.module.css'
import { Link } from 'react-router-dom'

function Footer() {
  const isUserLoggedIn = localStorage.getItem('token') && localStorage.getItem('type') === 'user';
  
  return (
    <div className={styles.container2}>
      <div className={styles.footerContent}>
        {/* Navigation Links Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Navigation</h3>
          <ul className={styles.list}>
            <li>
              <Link to="/jobs" className={styles.contact}>
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.contact}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/employer/dashboard" className={styles.contact}>
                Post a Job
              </Link>
            </li>
          </ul>
        </div>

        {/* Authentication Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Account</h3>
          <ul className={styles.list}>
            {isUserLoggedIn ? (
              <>
                <li>
                  <Link to="/user-profile" className={styles.contact}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/my-applications" className={styles.contact}>
                    My Applications
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/auth" className={styles.contact}>
                    User Login
                  </Link>
                </li>
                <li>
                  <Link to="/employer/auth" className={styles.contact}>
                    Employer Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Company Info Section */}
        <div className={styles.footerSection}>
          <Link to="/"><h3 className={styles.footerHeading}>SKILLMATCH</h3></Link>
          <p className={styles.footerDescription}>
            Connecting talent with opportunity
          </p>
          <p className={styles.footerContact}>
            <Link
              to="mailto:aimanqadree@gmail.com"
              className={styles.contact}
            >
              aimanqadree@gmail.com
            </Link>
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles.Creator}>
        <p>© Copyright 2025 By <span className={styles.brandHighlight}>Aiman Qadree</span>, All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
