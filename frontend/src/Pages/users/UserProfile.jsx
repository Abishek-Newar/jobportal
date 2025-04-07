import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building2, Briefcase, GraduationCap, Calendar, Link as LinkIcon, FileText, BookOpen, Languages, Award, Plus, X, Edit, Save, Trash2 } from 'lucide-react';
import axios from "axios"
import { BACKEND_URL } from '../../../lib';
import Navbar from '../../components/Navbar';
import { toast, Toaster } from 'sonner';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    userProfile: { 
      skills: [],
      experiences: [],
      project: [],
      Education: []
    }
  });
  const [loading, setLoading] = useState(true);
  
  // State for editing sections
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  
  // State for new items
  const [newExperience, setNewExperience] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [newEducation, setNewEducation] = useState(false);
  
  // Templates for new items
  const emptyExperience = {
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  };
  
  const emptyProject = {
    title: '',
    from: '',
    to: '',
    details: '',
    projectLink: ''
  };
  
  const emptyEducation = {
    education: '',
    institute: '',
    course: '',
    specialization: '',
    courseType: 'Full-time',
    from: '',
    to: '',
    grade: ''
  };

  useEffect(() => {
    async function serverCall() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setProfile(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    }
    serverCall();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setProfile(prev => ({
        ...prev,
        userProfile: {
          ...prev.userProfile,
          [section]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setProfile(prev => ({
      ...prev,
      userProfile: {
        ...prev.userProfile,
        skills
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to update your profile");
        return;
      }
      
      await axios.post(`${BACKEND_URL}/user/update-profile`, profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  
  // Handlers for experience editing
  const handleExperienceChange = (field, value) => {
    setEditingExperience(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const saveExperience = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to update your profile");
        return;
      }
      
      // If it's a new experience
      if (newExperience) {
        await axios.post(`${BACKEND_URL}/user/add-experience`, editingExperience, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update local state
        setProfile(prev => ({
          ...prev,
          userProfile: {
            ...prev.userProfile,
            experiences: [...(prev.userProfile.experiences || []), editingExperience]
          }
        }));
        
        setNewExperience(false);
      } else {
        // Update existing experience
        await axios.put(`${BACKEND_URL}/user/update-experience/${editingExperience.id}`, editingExperience, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update local state
        setProfile(prev => ({
          ...prev,
          userProfile: {
            ...prev.userProfile,
            experiences: prev.userProfile.experiences.map(exp => 
              exp.id === editingExperience.id ? editingExperience : exp
            )
          }
        }));
      }
      
      setEditingExperience(null);
      toast.success("Experience saved successfully");
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error("Failed to save experience");
    }
  };
  
  // Handlers for project editing
  const handleProjectChange = (field, value) => {
    setEditingProject(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const saveProject = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to update your profile");
        return;
      }
      
      // If it's a new project
      if (newProject) {
        await axios.post(`${BACKEND_URL}/user/addProject`, editingProject, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update local state
        setProfile(prev => ({
          ...prev,
          userProfile: {
            ...prev.userProfile,
            project: [...(prev.userProfile.project || []), editingProject]
          }
        }));
        
        setNewProject(false);
      } else {
        // Update existing project
        await axios.put(`${BACKEND_URL}/user/update-project/${editingProject.id}`, editingProject, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update local state
        setProfile(prev => ({
          ...prev,
          userProfile: {
            ...prev.userProfile,
            project: prev.userProfile.project.map(proj => 
              proj.id === editingProject.id ? editingProject : proj
            )
          }
        }));
      }
      
      setEditingProject(null);
      toast.success("Project saved successfully");
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    }
  };
  
  // Handlers for education editing
  const handleEducationChange = (field, value) => {
    setEditingEducation(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const saveEducation = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to update your profile");
        return;
      }
      
      // If it's a new education
      if (newEducation) {
        await axios.post(`${BACKEND_URL}/user/add-education`, editingEducation, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update local state
        setProfile(prev => ({
          ...prev,
          userProfile: {
            ...prev.userProfile,
            Education: [...(prev.userProfile.Education || []), editingEducation]
          }
        }));
        
        setNewEducation(false);
      } else {
        // Update existing education
        await axios.put(`${BACKEND_URL}/user/update-education/${editingEducation.id}`, editingEducation, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update local state
        setProfile(prev => ({
          ...prev,
          userProfile: {
            ...prev.userProfile,
            Education: prev.userProfile.Education.map(edu => 
              edu.id === editingEducation.id ? editingEducation : edu
            )
          }
        }));
      }
      
      setEditingEducation(null);
      toast.success("Education saved successfully");
    } catch (error) {
      console.error("Error saving education:", error);
      toast.error("Failed to save education");
    }
  };

  const renderField = (icon, label, name, value, type) => {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <label className="text-white font-semibold">{label}</label>
        </div>
        {isEditing ? (
          type === 'textarea' ? (
            <textarea
              name={name}
              value={value || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white"
              rows={4}
            />
          ) : (
            <input
              type={type || 'text'}
              name={name}
              value={value || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white"
            />
          )
        ) : (
          <p className="text-gray-300">{value || 'Not specified'}</p>
        )}
      </div>
    );
  };

  // Experience section with edit functionality
  const renderExperienceSection = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Experience</h3>
          <button 
            onClick={() => {
              setEditingExperience({...emptyExperience});
              setNewExperience(true);
            }}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        
        {editingExperience && (
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingExperience.title || ''}
                  onChange={(e) => handleExperienceChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Company</label>
                <input
                  type="text"
                  value={editingExperience.company || ''}
                  onChange={(e) => handleExperienceChange('company', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={editingExperience.location || ''}
                  onChange={(e) => handleExperienceChange('location', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  value={editingExperience.startDate ? new Date(editingExperience.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => handleExperienceChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingExperience.current || false}
                  onChange={(e) => handleExperienceChange('current', e.target.checked)}
                  className="bg-[#121212] border border-gray-700 rounded text-blue-500"
                />
                <label className="text-gray-300">Currently working here</label>
              </div>
              {!editingExperience.current && (
                <div>
                  <label className="block text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={editingExperience.endDate ? new Date(editingExperience.endDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleExperienceChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Description</label>
              <textarea
                value={editingExperience.description || ''}
                onChange={(e) => handleExperienceChange('description', e.target.value)}
                className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditingExperience(null);
                  setNewExperience(false);
                }}
                className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveExperience}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 flex items-center gap-1"
              >
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        )}
        
        {profile.userProfile?.experiences && profile.userProfile.experiences.length > 0 ? (
          <div className="space-y-4">
            {profile.userProfile.experiences.map((experience, index) => (
              <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 relative">
                {editingExperience?.id === experience.id ? (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => setEditingExperience(null)}
                      className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => setEditingExperience({...experience})}
                      className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                )}
                <h4 className="text-white font-semibold">{experience.title}</h4>
                <p className="text-gray-400">{experience.company} • {experience.location}</p>
                <p className="text-gray-400">
                  {new Date(experience.startDate).toLocaleDateString()} - 
                  {experience.current ? 'Present' : new Date(experience.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-300 mt-2">{experience.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No experience added yet</p>
        )}
      </div>
    );
  };

  // Project section with edit functionality
  const renderProjectSection = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Projects</h3>
          <button 
            onClick={() => {
              setEditingProject({...emptyProject});
              setNewProject(true);
            }}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        
        {editingProject && (
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingProject.title || ''}
                  onChange={(e) => handleProjectChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Project Link</label>
                <input
                  type="text"
                  value={editingProject.projectLink || ''}
                  onChange={(e) => handleProjectChange('projectLink', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  value={editingProject.from ? new Date(editingProject.from).toISOString().split('T')[0] : ''}
                  onChange={(e) => handleProjectChange('from', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">End Date</label>
                <input
                  type="date"
                  value={editingProject.to ? new Date(editingProject.to).toISOString().split('T')[0] : ''}
                  onChange={(e) => handleProjectChange('to', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Details</label>
              <textarea
                value={editingProject.details || ''}
                onChange={(e) => handleProjectChange('details', e.target.value)}
                className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditingProject(null);
                  setNewProject(false);
                }}
                className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveProject}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 flex items-center gap-1"
              >
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        )}
        
        {profile.userProfile?.project && profile.userProfile.project.length > 0 ? (
          <div className="space-y-4">
            {profile.userProfile.project.map((project, index) => (
              <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 relative">
                {editingProject?.id === project.id ? (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => setEditingProject({...project})}
                      className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                )}
                <h4 className="text-white font-semibold">{project.title}</h4>
                <p className="text-gray-400">
                  {new Date(project.from).toLocaleDateString()} - 
                  {new Date(project.to).toLocaleDateString()}
                </p>
                <p className="text-gray-300 mt-2">{project.details}</p>
                {project.projectLink && (
                  <a 
                    href={project.projectLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No projects added yet</p>
        )}
      </div>
    );
  };

  // Education section with edit functionality
  const renderEducationSection = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Education</h3>
          <button 
            onClick={() => {
              setEditingEducation({...emptyEducation});
              setNewEducation(true);
            }}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        
        {editingEducation && (
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-1">Degree</label>
                <input
                  type="text"
                  value={editingEducation.education || ''}
                  onChange={(e) => handleEducationChange('education', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Institute</label>
                <input
                  type="text"
                  value={editingEducation.institute || ''}
                  onChange={(e) => handleEducationChange('institute', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Course</label>
                <input
                  type="text"
                  value={editingEducation.course || ''}
                  onChange={(e) => handleEducationChange('course', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Specialization</label>
                <input
                  type="text"
                  value={editingEducation.specialization || ''}
                  onChange={(e) => handleEducationChange('specialization', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Course Type</label>
                <select
                  value={editingEducation.courseType || 'Full-time'}
                  onChange={(e) => handleEducationChange('courseType', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Distance">Distance</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Grade</label>
                <input
                  type="text"
                  value={editingEducation.grade || ''}
                  onChange={(e) => handleEducationChange('grade', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  value={editingEducation.from ? new Date(editingEducation.from).toISOString().split('T')[0] : ''}
                  onChange={(e) => handleEducationChange('from', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">End Date</label>
                <input
                  type="date"
                  value={editingEducation.to ? new Date(editingEducation.to).toISOString().split('T')[0] : ''}
                  onChange={(e) => handleEducationChange('to', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditingEducation(null);
                  setNewEducation(false);
                }}
                className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveEducation}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 flex items-center gap-1"
              >
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        )}
        
        {profile.userProfile?.Education && profile.userProfile.Education.length > 0 ? (
          <div className="space-y-4">
            {profile.userProfile.Education.map((education, index) => (
              <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 relative">
                {editingEducation?.id === education.id ? (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => setEditingEducation(null)}
                      className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => setEditingEducation({...education})}
                      className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                )}
                <h4 className="text-white font-semibold">{education.education}</h4>
                <p className="text-gray-400">{education.institute}</p>
                <p className="text-gray-400">{education.course} • {education.specialization}</p>
                <p className="text-gray-400">{education.courseType}</p>
                <p className="text-gray-400">
                  {new Date(education.from).toLocaleDateString()} - 
                  {new Date(education.to).toLocaleDateString()}
                </p>
                {education.grade && <p className="text-gray-300 mt-2">Grade: {education.grade}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No education added yet</p>
        )}
      </div>
    );
  };

  // Add this function before the return statement
    const renderSection = (title, items = [], renderItem) => {
      return (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
          {items && items.length > 0 ? (
            <div className="space-y-4">
              {items.map(renderItem)}
            </div>
          ) : (
            <p className="text-gray-400">No {title.toLowerCase()} added yet</p>
          )}
        </div>
      );
    };
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#080808] pt-[15vh] flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#080808] p-6 pt-[15vh]">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-white text-[#080808] rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-white text-[#080808] rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#121212] rounded-xl shadow-lg p-8 border border-gray-800">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>
                {renderField(<User className="w-5 h-5 text-blue-400" />, 'Full Name', 'name', profile.name)}
                {renderField(<Mail className="w-5 h-5 text-green-400" />, 'Email', 'email', profile.email, 'email')}
                {renderField(
                  <Phone className="w-5 h-5 text-yellow-400" />, 
                  'Phone', 
                  'userProfile.Phone', 
                  profile.userProfile?.Phone, 
                  'tel'
                )}
                {renderField(
                  <FileText className="w-5 h-5 text-purple-400" />, 
                  'Resume Headline', 
                  'userProfile.resumeHeadline', 
                  profile.userProfile?.resumeHeadline
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Career Information</h3>
                {renderField(
                  <Award className="w-5 h-5 text-pink-400" />, 
                  'Expected Salary', 
                  'userProfile.expectedSalary', 
                  profile.userProfile?.expectedSalary
                )}
                {renderField(
                  <Calendar className="w-5 h-5 text-orange-400" />, 
                  'Notice Period', 
                  'userProfile.noticePeriod', 
                  profile.userProfile?.noticePeriod
                )}
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-green-400" />
                    <label className="text-white font-semibold">Skills</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.userProfile?.skills?.join(', ') || ''}
                      onChange={handleSkillsChange}
                      placeholder="Enter skills separated by commas"
                      className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.userProfile?.skills?.map((skill, index) => (
                        <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      )) || <p className="text-gray-300">No skills specified</p>}
                    </div>
                  )}
                </div>
              </div>

              {renderSection('Experience', profile.userProfile?.experiences, (experience) => (
                <div key={experience.id} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                  <h4 className="text-white font-semibold">{experience.title}</h4>
                  <p className="text-gray-400">{experience.company} • {experience.location}</p>
                  <p className="text-gray-400">
                    {new Date(experience.startDate).toLocaleDateString()} - 
                    {experience.current ? 'Present' : new Date(experience.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 mt-2">{experience.description}</p>
                </div>
              ))}

              {renderSection('Projects', profile.userProfile?.project, (project) => (
                <div key={project.id} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                  <h4 className="text-white font-semibold">{project.title}</h4>
                  <p className="text-gray-400">
                    {new Date(project.from).toLocaleDateString()} - 
                    {new Date(project.to).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 mt-2">{project.details}</p>
                  {project.projectLink && (
                    <a 
                      href={project.projectLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}

              {renderSection('Education', profile.userProfile?.Education, (education) => (
                <div key={education.id} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                  <h4 className="text-white font-semibold">{education.education}</h4>
                  <p className="text-gray-400">{education.institute}</p>
                  <p className="text-gray-400">{education.course} • {education.specialization}</p>
                  <p className="text-gray-400">{education.courseType}</p>
                  <p className="text-gray-400">
                    {new Date(education.from).toLocaleDateString()} - 
                    {new Date(education.to).toLocaleDateString()}
                  </p>
                  {education.grade && <p className="text-gray-300 mt-2">Grade: {education.grade}</p>}
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;