import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../lib';
import { Download, Mail, Phone, User, Briefcase, Building, MapPin } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const Applied = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login to view applications');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/employer/applications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setApplications(response.data.data);
        } else {
          setError('Failed to fetch applications');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Error fetching applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDownloadResume = async (resumeUrl, applicantName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to download resume');
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/download/${resumeUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });

      // Create a blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${applicantName}_resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Resume downloaded successfully');
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Error downloading resume');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Job Applications</h1>
        
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <p className="text-gray-500 text-center">No applications received yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Applicants List */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Applicants ({applications.length})</h2>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                  {applications.map((applicant) => (
                    <div 
                      key={applicant.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedApplicant?.id === applicant.id 
                          ? 'bg-blue-50 border border-blue-300' 
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                      onClick={() => setSelectedApplicant(applicant)}
                    >
                      <h3 className="font-semibold text-gray-800">{applicant.name}</h3>
                      <p className="text-gray-500 text-sm">{applicant.email}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Applied to {applicant.appliedJobs?.length || 0} job{applicant.appliedJobs?.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Applicant Details */}
            <div className="md:col-span-2">
              {selectedApplicant ? (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedApplicant.name}</h2>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Mail size={16} />
                        <span>{selectedApplicant.email}</span>
                      </div>
                      {selectedApplicant.userProfile?.Phone && (
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <Phone size={16} />
                          <span>{selectedApplicant.userProfile.Phone}</span>
                        </div>
                      )}
                    </div>
                    
                    {selectedApplicant.userProfile?.resume && (
                      <button
                        onClick={() => handleDownloadResume(selectedApplicant.userProfile.resume, selectedApplicant.name)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4 md:mt-0"
                      >
                        <Download size={16} />
                        Download Resume
                      </button>
                    )}
                  </div>
                  
                  {selectedApplicant.userProfile?.resumeHeadline && (
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Resume Headline</h3>
                      <p className="text-gray-700">{selectedApplicant.userProfile.resumeHeadline}</p>
                    </div>
                  )}
                  
                  {selectedApplicant.userProfile?.skills && selectedApplicant.userProfile.skills.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplicant.userProfile.skills.map((skill, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Applied Jobs</h3>
                    <div className="space-y-3">
                      {selectedApplicant.appliedJobs?.map((job, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-800">{job.title}</h4>
                          <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <Building size={14} />
                            <span>{job.company}</span>
                          </div>
                          {job.location && (
                            <div className="flex items-center gap-2 text-gray-600 mt-1">
                              <MapPin size={14} />
                              <span>{job.location}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 flex items-center justify-center h-full">
                  <p className="text-gray-500">Select an applicant to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applied;