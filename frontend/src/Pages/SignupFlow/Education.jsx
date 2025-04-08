import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { BACKEND_URL } from '../../../lib';

const Education = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    degree: '',
    institution: '',
    field: '',
    startYear: '',
    endYear: '',
    current: false
  });
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    technologies: '',
    link: ''
  });
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);

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
        if (parsedData.education) {
          setEducation(parsedData.education);
        }
        if (parsedData.projects) {
          setProjects(parsedData.projects);
        }
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, [navigate]);

  const handleEducationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentEducation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // If current education is checked, clear end year
    if (name === 'current' && checked) {
      setCurrentEducation(prev => ({
        ...prev,
        endYear: ''
      }));
    }
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEducation = () => {
    setEducation(prev => [...prev, currentEducation]);
    setCurrentEducation({
      degree: '',
      institution: '',
      field: '',
      startYear: '',
      endYear: '',
      current: false
    });
    setIsAddingEducation(false);
  };

  const handleAddProject = () => {
    setProjects(prev => [...prev, currentProject]);
    setCurrentProject({
      title: '',
      description: '',
      technologies: '',
      link: ''
    });
    setIsAddingProject(false);
  };

  const handleRemoveEducation = (index) => {
    setEducation(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveProject = (index) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Save to localStorage for persistence through the flow
      const existingData = localStorage.getItem('signupFlowData');
      const parsedData = existingData ? JSON.parse(existingData) : {};
      
      localStorage.setItem('signupFlowData', JSON.stringify({
        ...parsedData,
        education,
        projects
      }));
      
      // Optional: Save to backend
      await axios.post(`${BACKEND_URL}/user/update-profile`, {
        education,
        projects
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast.success('Profile completed successfully!');
      
      // Navigate to profile page
      setTimeout(() => {
        navigate('/user-profile');
      }, 1000);
    } catch (error) {
      console.error('Error saving education and projects:', error);
      toast.error('Failed to save education and projects. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">Education & Projects</h2>
          <p className="text-center text-gray-600 mt-2">Step 4 of 4</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        {/* Education Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Education</h3>
          
          {education.length > 0 ? (
            <div className="mb-6 space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    &times;
                  </button>
                  <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-6 text-center py-8 border border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500">No education added yet.</p>
              <p className="text-sm text-gray-400 mt-1">Click "Add Education" to add your educational background.</p>
            </div>
          )}
          
          {isAddingEducation ? (
            <div className="mb-6 border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Add Education</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      id="degree"
                      name="degree"
                      value={currentEducation.degree}
                      onChange={handleEducationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Bachelor's, Master's"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={currentEducation.institution}
                      onChange={handleEducationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., University name"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    id="field"
                    name="field"
                    value={currentEducation.field}
                    onChange={handleEducationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startYear" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Year
                    </label>
                    <input
                      type="number"
                      id="startYear"
                      name="startYear"
                      value={currentEducation.startYear}
                      onChange={handleEducationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 2018"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endYear" className="block text-sm font-medium text-gray-700 mb-1">
                      End Year
                    </label>
                    <input
                      type="number"
                      id="endYear"
                      name="endYear"
                      value={currentEducation.endYear}
                      onChange={handleEducationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 2022"
                      disabled={currentEducation.current}
                      required={!currentEducation.current}
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="current"
                    name="current"
                    checked={currentEducation.current}
                    onChange={handleEducationChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                    I am currently studying here
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingEducation(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Education
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setIsAddingEducation(true)}
                className="w-full py-2 border border-dashed border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                + Add Education
              </button>
            </div>
          )}
        </div>
        
        {/* Projects Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Projects</h3>
          
          {projects.length > 0 ? (
            <div className="mb-6 space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    &times;
                  </button>
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">Technologies: {project.technologies}</p>
                  <p className="mt-2 text-sm">{project.description}</p>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm hover:underline mt-2 inline-block"
                    >
                      Project Link
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-6 text-center py-8 border border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500">No projects added yet.</p>
              <p className="text-sm text-gray-400 mt-1">Click "Add Project" to showcase your work.</p>
            </div>
          )}
          
          {isAddingProject ? (
            <div className="mb-6 border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Add Project</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentProject.title}
                    onChange={handleProjectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={currentProject.technologies}
                    onChange={handleProjectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., React, Node.js, MongoDB"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={currentProject.description}
                    onChange={handleProjectChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Link (Optional)
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={currentProject.link}
                    onChange={handleProjectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., https://github.com/yourusername/project"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Project
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setIsAddingProject(true)}
                className="w-full py-2 border border-dashed border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                + Add Project
              </button>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/signup/experience')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Complete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Education;