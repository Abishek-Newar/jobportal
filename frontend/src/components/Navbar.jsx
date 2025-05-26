import React, { useState } from 'react'
import styles from  "./navbar.module.css"
import {useNavigate} from "react-router-dom"
import { Menu, X } from 'lucide-react'

function Navbar() {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <nav className={styles.Navbar}>
        <div>
          <h3 className={styles.logo}>SKILLMATCH</h3>
        </div>
        
        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {localStorage.getItem("token") && localStorage.getItem("type") === "user" ? (
            <div className={styles.userButtons}> 
              <button onClick={() => {navigate("/my-applications")}} className={styles.navButton}>
                My Applications
              </button>
              <button onClick={() => {navigate("/user-profile")}} className={styles.navButton}>
                My Profile
              </button>
              <button onClick={handleLogout} className={styles.btn}>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => {navigate("/auth")}} className={styles.btn}>
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {localStorage.getItem("token") && localStorage.getItem("type") === "user" ? (
            <>
              <button 
                onClick={() => {navigate("/my-applications"); setIsMobileMenuOpen(false)}} 
                className={styles.mobileNavButton}
              >
                My Applications
              </button>
              <button 
                onClick={() => {navigate("/user-profile"); setIsMobileMenuOpen(false)}} 
                className={styles.mobileNavButton}
              >
                My Profile
              </button>
              <button 
                onClick={() => {handleLogout(); setIsMobileMenuOpen(false)}} 
                className={styles.mobileBtnPrimary}
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={() => {navigate("/auth"); setIsMobileMenuOpen(false)}} 
              className={styles.mobileBtnPrimary}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
