import React, { useEffect, useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiBriefcase, 
  FiDollarSign, 
  FiCalendar,
  FiX,
  FiCheck,
  FiArrowLeft
} from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const AddClient = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projects: [],
    value: '',
    status: 'active',
    lastContact: new Date().toISOString().split('T')[0]
  });
  
  const [newProject, setNewProject] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(()=>{
    const fetchdata = async()=>{
      if (!id) return;
      try{
      const response = await axios.get(`http://localhost:3000/api/clients/add/${id}`)
      const data = response.data.data.contact;
      console.log(data);
      if(data){
        setFormData({
          name: data.name || "",
          email: data.email || "",
          company: data.company || "",
          status: data.status || "",
          projects: [],
          value: "",
          lastContact: data.lastContact ? new Date(data.lastContact).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        })
      }
    }catch(err) {
        setErrorMessage(err.response?.data?.message || 'Failed to load contact');
      }
    }
    fetchdata()
  },[id])

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectAdd = () => {
    if (newProject.trim() && !formData.projects.includes(newProject.trim())) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, newProject.trim()]
      }));
      setNewProject('');
    }
  };

  const handleProjectRemove = (projectToRemove) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project !== projectToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post("http://localhost:3000/api/clients/add", formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      setSuccessMessage('Client added successfully!');
      setTimeout(() => {
        navigate('/clients');
      }, 2000);

    } catch (error) {
      let errorMsg = "Failed to add client";
      if (error.response) {
        errorMsg = error.response.data.message || errorMsg;
      } else if (error.request) {
        errorMsg = "No response from server";
      }
      setErrorMessage(error.response);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Client</h1>
          <Link 
            to="/clients" 
            className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <FiArrowLeft size={18} />
            <span>Back to Clients</span>
          </Link>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Client Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Client Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Acme Corporation"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="contact@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBriefcase className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Project Value */}
            <div className="space-y-2">
              <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                Project Value <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="value"
                  name="value"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="$4,250"
                  value={formData.value}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Last Contact Date */}
            <div className="space-y-2">
              <label htmlFor="lastContact" className="block text-sm font-medium text-gray-700">
                Last Contact Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="lastContact"
                  name="lastContact"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.lastContact}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Projects - Tag-like Interface */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="projects" className="block text-sm font-medium text-gray-700">
                Projects <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.projects.map(project => (
                  <span 
                    key={project} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {project}
                    <button 
                      type="button"
                      onClick={() => handleProjectRemove(project)}
                      className="ml-1.5 inline-flex text-purple-500 hover:text-purple-700"
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  id="newProject"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Add a project (e.g., Ecommerce Website)"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleProjectAdd())}
                />
                <button
                  type="button"
                  onClick={handleProjectAdd}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link 
              to="/clients" 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                'Saving...'
              ) : (
                <>
                  <FiCheck className="mr-2" />
                  Save Client
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;