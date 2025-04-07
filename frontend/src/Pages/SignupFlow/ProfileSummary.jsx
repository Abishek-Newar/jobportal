import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { BACKEND_URL } from '../../../lib';

const ProfileSummary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    summary: '',
    skills: []
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please sign up first');
      navigate('/auth');
      return;
    }
    
    // Check if personal details are completed
    const savedData = localStorage.getItem('signupFlowData');
    if (!savedData || !JSON.parse(savedData).personalDetails) {
      toast.error('Please complete personal details first');
      navigate('/signup/personal-details');
      return;
    }
    
    // Load existing data if available
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.profileSummary) {
          setFormData(parsedData.profileSummary);
        }
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, [navigate]);

  const handleSummaryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      summary: e.target.value
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
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
        profileSummary: formData
      }));
      
      // Optional: Save to backend
      await axios.post(`${BACKEND_URL}/user/update-profile`, {
        profileSummary: formData
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast.success('Profile summary saved successfully!');
      
      // Navigate to next step
      setTimeout(() => {
        navigate('/signup/experience');
      }, 1000);
    } catch (error) {
      console.error('Error saving profile summary:', error);
      toast.error('Failed to save profile summary. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">Profile Summary & Skills</h2>
          <p className="text-center text-gray-600 mt-2">Step 2 of 4</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleSummaryChange}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write a brief summary about yourself, your skills, and career goals..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            <div className="flex">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., React, JavaScript, HTML"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  <span className="text-sm">{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/signup/personal-details')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Next: Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSummary;