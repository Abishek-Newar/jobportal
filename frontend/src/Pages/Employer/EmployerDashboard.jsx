import React from 'react'
import Sidebar from '../../Model/Employer/Sidebar'
import ViewJobs from '../../Model/Employer/ViewJobs'
import JobAdd from '../../Model/Employer/JobAdd'
import { useNavigate } from 'react-router-dom'

const EmployerDashboard = () => {
    const navigate = useNavigate()
    const [page, setPage] = React.useState("job")
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
    
    React.useEffect(() => {
        if(!localStorage.getItem("token") || localStorage.getItem("type") !== "employer"){
            navigate("/employer/auth")
        }
    }, [])

    // Close sidebar when clicking outside on mobile/tablet
    const handleOverlayClick = () => {
        setIsSidebarOpen(false)
    }

    // Toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    // Close sidebar when page changes on mobile/tablet
    const handlePageChange = (newPage) => {
        setPage(newPage)
        setIsSidebarOpen(false)
    }

    return (
        <div className='min-h-screen flex relative'>
            {/* Mobile/Tablet Menu Button */}
            <button
                onClick={toggleSidebar}
                className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#3a7a64] text-white rounded-md shadow-lg hover:bg-[#3a7a64] transition-colors'
                aria-label="Toggle menu"
            >
                <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    {isSidebarOpen ? (
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                        />
                    ) : (
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 6h16M4 12h16M4 18h16" 
                        />
                    )}
                </svg>
            </button>

            {/* Overlay for mobile/tablet */}
            {isSidebarOpen && (
                <div 
                    className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
                    onClick={handleOverlayClick}
                />
            )}

            {/* Sidebar */}
            <div className={`
                lg:w-[25%] lg:relative lg:translate-x-0 lg:shadow-none
                fixed left-0 top-0 h-full w-80 max-w-[85vw] z-40
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                bg-white shadow-xl lg:shadow-none
            `}>
                <Sidebar 
                    setPage={handlePageChange} 
                    currentPage={page}
                    closeSidebar={() => setIsSidebarOpen(false)}
                />
            </div>

            {/* Main Content */}
            <div className='lg:w-[75%] w-full min-h-screen lg:ml-0'>
                {page === "job" ? <ViewJobs /> : <JobAdd />}
            </div>
        </div>
    )
}

export default EmployerDashboard