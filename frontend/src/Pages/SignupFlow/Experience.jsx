import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { BACKEND_URL } from '../../../lib';

const Experience = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please sign up first');
      navigate('/auth');
      return;
    }
    
    // Check if previous steps are completed
    const savedData = localStorage.getItem('signupFlowData');
    if (!savedData || !JSON.parse(savedData).profileSummary) {
      toast.error('Please complete profile summary first');
      navigate('/signup/profile-summary');
      return;
    }
    
    // Load existing data if available
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.experiences) {
          setExperiences(parsedData.experiences);
        }
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, [navigate]);

  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentExperience(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // If current job is checked, clear end date
    if (name === 'current' && checked) {
      setCurrentExperience(prev => ({
        ...prev,
        endDate: ''
      }));
    }
  };

  const handleAddExperience = () => {
    setExperiences(prev => [...prev, currentExperience]);
    setCurrentExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    setIsAdding(false);
  };

  const handleRemoveExperience = (index) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Save to localStorage for persistence through the flow
      const existingData = localStorage.getItem('signupFlowData');
      const parsedData = existingData ? JSON.parse(existingData) : {};
      
      localStorage.setItem('signupFlowData', JSON.stringify({
        ...parsedData,
        experiences
      }));
      
      // Optional: Save to backend
      await axios.post(`${BACKEND_URL}/user/update-profile`, {
        experiences
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast.success('Experience details saved successfully!');
      
      // Navigate to next step
      setTimeout(() => {
        navigate('/signup/education');
      }, 1000);
    } catch (error) {
      console.error('Error saving experience details:', error);
      toast.error('Failed to save experience details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">Work Experience</h2>
          <p className="text-center text-gray-600 mt-2">Step 3 of 4 (Optional for freshers)</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        
        {experiences.length > 0 ? (
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Your Experiences</h3>
            {experiences.map((exp, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 relative">
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  &times;
                </button>
                <h4 className="font-medium">{exp.title}</h4>
                <p className="text-gray-600">{exp.company}, {exp.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(exp.startDate).toLocaleDateString()} - 
                  {exp.current ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString()}`}
                </p>
                <p className="mt-2 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-6 text-center py-8 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No experience added yet.</p>
            <p className="text-sm text-gray-400 mt-1">Click "Add Experience" to add your work history or skip if you're a fresher.</p>
          </div>
        )}
        
        {isAdding ? (
          <div className="mb-6 border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Add Experience</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentExperience.title}
                    onChange={handleExperienceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={currentExperience.company}
                    onChange={handleExperienceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={currentExperience.location}
                  onChange={handleExperienceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={currentExperience.startDate}
                    onChange={handleExperienceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={currentExperience.endDate}
                    onChange={handleExperienceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={currentExperience.current}
                    required={!currentExperience.current}
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="current"
                  name="current"
                  checked={currentExperience.current}
                  onChange={handleExperienceChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                  I currently work here
                </label>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={currentExperience.description}
                  onChange={handleExperienceChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Experience
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="w-full py-2 border border-dashed border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              + Add Experience
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/signup/profile-summary')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {experiences.length > 0 ? 'Next: Education' : 'Skip & Continue to Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Experience;