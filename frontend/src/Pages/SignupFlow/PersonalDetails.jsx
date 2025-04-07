import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { BACKEND_URL } from '../../../lib';

const PersonalDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    expectedSalary: '',
    phone: '',
    noticePeriod: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please sign up first');
      navigate('/auth');
      return;
    }
    
    // Load existing data if available
    const savedData = localStorage.getItem('signupFlowData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.personalDetails) {
          setFormData(parsedData.personalDetails);
        }
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Save to localStorage for persistence through the flow
      const existingData = localStorage.getItem('signupFlowData');
      const parsedData = existingData ? JSON.parse(existingData) : {};
      
      localStorage.setItem('signupFlowData', JSON.stringify({
        ...parsedData,
        personalDetails: formData
      }));
      
    //   Optional: Save to backend
      await axios.post(`${BACKEND_URL}/user/update-profile`, {
        personalDetails: formData
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast.success('Personal details saved successfully!');
      
      // Navigate to next step
      setTimeout(() => {
        navigate('/signup/profile-summary');
      }, 1000);
    } catch (error) {
      console.error('Error saving personal details:', error);
      toast.error('Failed to save personal details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">Personal Details</h2>
          <p className="text-center text-gray-600 mt-2">Step 1 of 4</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Current Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Mohali, India"
              required
            />
          </div>
          
          <div>
            <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-1">
              Expected Salary (₹ per annum)
            </label>
            <input
              type="number"
              id="expectedSalary"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 500000"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 7006110177"
              required
            />
          </div>
          
          <div>
            <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-1">
              Notice Period
            </label>
            <select
              id="noticePeriod"
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Notice Period</option>
              <option value="Immediate">Immediate</option>
              <option value="15 Days or less">15 Days or less</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
              <option value="3 Months">3 Months</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Next: Profile Summary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;