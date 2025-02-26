import React from 'react'
import Sidebar from '../../Model/Employer/Sidebar'
import ViewJobs from '../../Model/Employer/ViewJobs'
import JobAdd from '../../Model/Employer/JobAdd'

const EmployerDashboard = () => {
    const [page,setPage] = React.useState("job")
  return (
    <div className='min-h-screen'>
        <div className='w-[25%]'>
            <Sidebar setPage={setPage} />
        </div>
        <div className='w-[75%]'>
            {
                page === "job"?
                <ViewJobs />
                :
                <JobAdd />
            }
        </div>
    </div>
  )
}

export default EmployerDashboard