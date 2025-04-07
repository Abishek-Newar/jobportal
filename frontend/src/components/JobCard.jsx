import React from 'react';
import { CalendarDays, MapPin, Clock, Building2, Briefcase, CircleDollarSign, Shield, ClipboardList, GraduationCap, BookOpen, MapPinned } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '../../lib';
import { toast } from 'sonner';

const JobCard = ({item, buttonName, onApplySuccess}) => {
    console.log(item)
    
    const handleApply = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Please login to apply for jobs");
          return;
        }
        
        const response = await axios.post(
          `${BACKEND_URL}/user/apply/${item.id}`, 
          {}, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        toast.success("Successfully applied for the job!");
        if (onApplySuccess) onApplySuccess(item.id);
      } catch (error) {
        console.error("Error applying for job:", error);
        toast.error(error.response?.data?.msg || "Failed to apply for job");
      }
    };
    
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
        <p className="text-gray-600 mt-2">{item.jobdescription.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">₹{item.pay}/month</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <div className="flex gap-2 flex-wrap">
            {item.jobtype.map((type, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="text-gray-700">{item.shift} Shift</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-800">Benefits</h3>
          </div>
          <p className="text-gray-600 ml-7">{item.benefits}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-800">Responsibilities</h3>
          </div>
          <p className="text-gray-600 ml-7">{item.jobdescription.responsibilities}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <h3 className="font-semibold text-gray-800">Requirements</h3>
          </div>
          <p className="text-gray-600 ml-7">{item.jobdescription.requirements}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-gray-800">Experience</h3>
          </div>
          <p className="text-gray-600 ml-7">{item.jobdescription.experience}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPinned className="w-5 h-5 text-pink-600" />
            <h3 className="font-semibold text-gray-800">Work Location</h3>
          </div>
          <p className="text-gray-600 ml-7">{item.jobdescription.worklocation}</p>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-red-600" />
            <span className="text-gray-700">Application Deadline: {new Date(item.jobdescription.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleApply}
              className='w-30 h-10 bg-orange-400 hover:bg-orange-600 text-white p-2 rounded-md'
            >
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;