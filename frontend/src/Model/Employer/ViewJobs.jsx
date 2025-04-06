import React from 'react'
import { BACKEND_URL } from '../../../lib'
import axios from "axios"
import JobCard from '../../components/JobCard'
const ViewJobs = () => {
  const [data,setData] = React.useState([])
  React.useEffect(()=>{
    async function serverCall(){
      const response = await axios.get(`${BACKEND_URL}/employee/getAllJobs`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response.data.data);
      setData(response.data.data)
    }
    serverCall()
  },[])
  return (
    <div className='p-10'>
      {
        data.map((item,index)=>(
          <JobCard item={item} buttonName='View Applications' />
        ))
      }
    </div>
  )
}

export default ViewJobs