import React from 'react'
import styles from './Profile.module.css'
import { IoLocationOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { PiSuitcaseSimple } from "react-icons/pi";
import { MdMailOutline } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import { RxPencil1 } from "react-icons/rx";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

function Profile() {
  return (
    <div className= {styles.main}>
    <div className={styles.container}>

      <div className={styles.box1}>
        <img className={styles.img} src="imageaimann.jpg" alt="Profile" />
      </div>

      <div className={styles.box2}>

        <div className={styles.details}>
          <h1>Aiman Jan <RxPencil1 className={styles.headinglogue} /></h1>
          <h4>Frontend Developer</h4>
          <p>at Infotechmon Pvt. Ltd</p>
        </div>

        <div className= {styles.location}>

          <ul className={styles.lists}>
            <li> <IoLocationOutline /> Mohali,INDIA</li>
            <li> <PiSuitcaseSimple /> Fresher</li>
            <li> <CiWallet />  ₹ 2,04000</li>
          </ul>

          <ul className={styles.lists}>
            <li> <CiPhone /> 7006110177</li>
            <li> <MdMailOutline />aimanQadree@gmail.com</li>
            <li> <IoCalendarClearOutline />15 Days Or less</li>
          </ul>
        </div>
      </div>
    </div>

    <div className={styles.resumeandSideBarSection}>
    <New/>
    <div className={styles.Resumeheadline1}>
    <Resume/>
    <Resumeheadline/>
    <KeySkills/>
    </div>

    </div>
    </div>
  )
}
export default Profile
                    // second section
function New(){
  const object = [
    {
      name:"Resume",
      link: "#"
    },
    {
      name:"Resume headline",
      link: "#"
    },
    {
      name:"Key skills",
      link: "#"
    },
    {
      name:"Employment",
      link: "#"
    },
    {
      name:"Education",
      link: "#"
    },
    {
      name:"IT skills",
      link: "#"
    },
    {
      name:"Projects",
      link: "#"
    },
    {
      name:"Profile summary",
      link: "#"
    },
    {
      name:"Accomplishments",
      link: "#"
    },
    {
      name:"Career profile",
      link: "#"
    },
    {
      name:"Personal details",
      link: "#"
    }

  ]
  return(
    <div className= {styles.secondcontainer}>
    <h2 className={styles.heading2}>Quick Links</h2>

        {
          object.map((item,index)=>(
            <div className={styles.boxes} key={index}>{item.name}</div>
          ))
        }

    </div>
  )
}

                    //  3rd section

function Resume(){
  return(
    <div className={styles.thirdcontainer}>
      <div>
        <h2 className={styles.thirdh2}>Resume</h2>
        <div className={styles.thirdh3}>
          <div className={styles.thirdh3p}>
        <h3>Aiman_Jan_Resume.pdf</h3>
        <p>Uploaded on February 15, 2025</p>
        </div>
        <div className={styles.logo}>
        <MdOutlineFileDownload  className={styles.logo1}/>      
        <RiDeleteBinLine  className={styles.logo1}/>

        </div>
        </div>
      </div>

      <div className={styles.fileInputBox}>
        <label className={styles.uploadbox}>Update resume</label>
        <p>Supported Formats: doc, docx, rtf,pdf,upto 2MB</p>
       <input type="file" name="" id="" />
      </div>
    </div>
  )
}                    


      // 4th section
 function Resumeheadline(){
  return(
         <div className={styles.container4}>
          <h2 className={styles.container4h4}>Resume Headline <RxPencil1 className={styles.headinglogue} /></h2>
          <p>I'm Aiman Jan Currently Pursuing Computer Science and Engineering from Ram Devi Jindal Group of Institutions enthusiatic about web development. I have learnt relevant skills (HtML, CSS, Bootstrap, JavaScript, React) for development and eager to contribute to gain experience.</p>
         </div>
  )
 }   
 
  
          //  5th section
function KeySkills(){
  const skills = [
    {
      name:"HTML",
      link: "#"
    },
    {
      name:"CSS",
      link: "#"
    },
    {
      name:"Bootstrap",
      link: "#"
    },
    {
      name:"Javascript",
      link: "#"
    },
    {
      name:"React",
      link: "#"
    },
    {
      name:"Tailwind",
      link: "#"
    }
  ]
  return(
    <div className={styles.container5h4}>
      <h2>Key skills<RxPencil1 className={styles.headinglogue} /></h2>
    <div className={styles.btn5}>
      {
          skills.map((item,index)=>(
            <button className={styles.skills5} key={index}>{item.name}</button>
          ))
        }
        </div>
    </div>
  )
}          
