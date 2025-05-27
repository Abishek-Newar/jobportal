import React from 'react'
import { BACKEND_URL } from '../../../lib'
import axios from "axios"
import JobCard from '../../components/JobCard'
import EmployerJobCard from '../../components/EmployerJobCard'
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
    <div className='w-full min-h-screen pt-16'>
      <h1 className=' text-center text-3xl'>Jobs</h1>
      <div className='p-10 flex w-full flex-wrap gap-6'>
      {
        data.map((item,index)=>(
          <EmployerJobCard item={item}  />
        ))
      }
    </div>
    </div>
  )
}

export default ViewJobs