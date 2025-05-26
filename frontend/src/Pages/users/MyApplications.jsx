import  { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../lib';
import JobCard from '../../components/JobCard';
import Navbar from '../../components/Navbar';
import { toast, Toaster } from 'sonner';

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error("Please login to view your applications");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${BACKEND_URL}/user/applications`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setApplications(response.data.data || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching applications:", error);
                toast.error("Failed to load your applications");
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return (
        <>
            <Navbar />
            <Toaster />
            <div className="min-h-screen bg-white pt-[15vh] pb-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-black mb-8">My Applications</h1>
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="bg-black rounded-lg p-8 text-center">
                            <h2 className="text-xl text-white mb-4">You haven't applied to any jobs yet</h2>
                            <p className="text-gray-300 mb-6">Start exploring jobs and apply to positions that match your skills and interests.</p>
                            <a href="/jobs" className=" bg-[#3A7A64] rounded text-[20px]  text-white cursor-pointer hover:bg-[#275446] transition duration-300 pt-2 pb-3 px-4">
                                Explore Jobs
                            </a>

                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {applications.map((job) => (
                                <JobCard 
                                    key={job.id} 
                                    item={job} 
                                    buttonName="Applied" 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MyApplications;