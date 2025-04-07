import React, { useState } from 'react';
import JobCard from '../../components/JobCard';
import { Search } from 'lucide-react';
import { BACKEND_URL } from '../../../lib';
import axios from "axios"
import Navbar from '../../components/Navbar';
import { toast, Toaster } from 'sonner';
import Footer from '../../Model/Landing/Footer';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleJobs, setVisibleJobs] = useState(9);
    const [appliedJobs, setAppliedJobs] = useState([]);
    React.useEffect(() => {
        async function serverCall() {
            try {
                const response = await axios.get(`${BACKEND_URL}/user/jobs/all`)
                console.log(response.data.data)
                setJobs(response.data.data)
                setLoading(false)
            } catch (error) {
                toast.error("Sorry, Unable to fetch jobs, please try later")
            }
        }
        serverCall();
    }, [])
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${BACKEND_URL}/user/jobs/${searchQuery}`)
            console.log(response.data)
            if(response.data.length === 0){
                toast.error("No jobs found")
            }else{
                setJobs(response.data);
            }
            setVisibleJobs(9);
        } catch (error) {
            toast.error("Unable to search jobs, please try later")
        }
    };

    const handleLoadMore = () => {
        setVisibleJobs(prev => prev + 9);
    };

    const visibleJobsList = jobs.slice(0, visibleJobs);
    const hasMoreJobs = visibleJobs < jobs.length;

    const handleApplySuccess = (jobId) => {
        setAppliedJobs([...appliedJobs, jobId]);
    };
    return (
        <>
            <Toaster />
            {
                loading ?

                    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    :

                    <div className="min-h-screen bg-[#080808] pt-[15vh] pb-6">
                        <Navbar />
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-4xl font-bold text-white mb-8">Find Your Dream Job</h1>

                            <form onSubmit={handleSearch} className="mb-8">
                                <div className="flex gap-4 max-w-2xl">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search for jobs..."
                                            className="w-full z-0 px-4 py-3 rounded-lg bg-[#121212] border border-gray-700 focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none text-white placeholder-gray-400"
                                        />
                                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-white text-[#080808] rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                            {
                                jobs.length === 0 ?
                                    <div className="text-white text-center">
                                        <h1 className="text-3xl font-bold">No Jobs Found</h1>
                                    </div>
                                    :
                                    // [1,2,3,4,5]
                                    <div> 
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                            {visibleJobsList.map((job) => (
                                                <JobCard 
                                                    key={job.id} 
                                                    item={job} 
                                                    buttonName={appliedJobs.includes(job.id) ? "Applied" : "Apply"} 
                                                    onApplySuccess={handleApplySuccess}
                                                />
                                            ))}
                                        </div>

                                        {hasMoreJobs && (
                                            <div className="flex justify-center mt-8">
                                                <button
                                                    onClick={handleLoadMore}
                                                    className="px-6 py-3 bg-white text-[#080808] rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold flex items-center gap-2"
                                                >
                                                    Load More Jobs
                                                </button>
                                            </div>
                                        )}
                                    </div>
                            }
                        </div>
                    </div>
            }
            <Footer />
        </>

    );
}

export default Jobs;