import React from 'react'
import Sidebar from '../../Model/Employer/Sidebar'
import ViewJobs from '../../Model/Employer/ViewJobs'
import JobAdd from '../../Model/Employer/JobAdd'
import { useNavigate } from 'react-router-dom'

const EmployerDashboard = () => {
    const navigate = useNavigate()
    React.useEffect(()=>{
        if(!localStorage.getItem("token") || localStorage.getItem("type") !== "employer"){
            navigate("/employee/auth")
        }
    },[])
    const [page,setPage] = React.useState("job")

    if (page==="job"){
        return <div className='min-h-screen flex'>
        <div className='w-[25%] min-h-screen'>
            <Sidebar setPage={setPage} />
        </div>
        <div className='w-[75%] min-h-screen'>
                <ViewJobs />
        </div>
    </div>
    }else{
        return <div className='min-h-screen flex'>
        <div className='w-[25%] min-h-screen'>
            <Sidebar setPage={setPage} />
        </div>
        <div className='w-[75%] min-h-screen'>
                <JobAdd />
        </div>
    </div>
    }
}

export default EmployerDashboard