import React, { useState } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiFilter, 
  FiChevronDown, 
  FiClock,
  FiCheckCircle,
  FiPause,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiAlertCircle
} from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AllProjects = () => {
  // Dummy project data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'E-commerce Platform',
      client: 'Acme Corporation',
      status: 'active',
      startDate: '2023-05-10',
      deadline: '2023-08-15',
      budget: '$45,000',
      team: ['Alex Johnson', 'Sarah Williams'],
      progress: 65,
      priority: 'high'
    },
    {
      id: 2,
      name: 'Mobile App Redesign',
      client: 'TechNova Inc',
      status: 'active',
      startDate: '2023-06-01',
      deadline: '2023-09-30',
      budget: '$32,500',
      team: ['Mike Chen', 'Emma Davis'],
      progress: 35,
      priority: 'medium'
    },
    {
      id: 3,
      name: 'API Integration',
      client: 'Global Solutions',
      status: 'on hold',
      startDate: '2023-04-15',
      deadline: '2023-07-20',
      budget: '$28,000',
      team: ['David Kim', 'Alex Johnson'],
      progress: 20,
      priority: 'medium'
    },
    {
      id: 4,
      name: 'Dashboard UI',
      client: 'InnoTech Labs',
      status: 'completed',
      startDate: '2023-03-01',
      deadline: '2023-05-30',
      budget: '$18,500',
      team: ['Sarah Williams', 'Mike Chen'],
      progress: 100,
      priority: 'low'
    },
    {
      id: 5,
      name: 'Web Portal',
      client: 'Digital Creations',
      status: 'active',
      startDate: '2023-06-15',
      deadline: '2023-10-31',
      budget: '$52,000',
      team: ['Emma Davis', 'David Kim'],
      progress: 15,
      priority: 'high'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Chart data
  const projectStatusData = {
    labels: projects.map(project => project.name),
    datasets: [
      {
        label: 'Progress %',
        data: projects.map(project => project.progress),
        backgroundColor: projects.map(project => 
          project.status === 'completed' ? '#10B981' :
          project.status === 'on hold' ? '#F59E0B' :
          '#3B82F6'
        ),
        borderRadius: 4
      }
    ]
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <FiClock className="text-blue-500" />;
      case 'completed': return <FiCheckCircle className="text-green-500" />;
      case 'on hold': return <FiPause className="text-yellow-500" />;
      default: return <FiAlertCircle className="text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Project Management</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="on hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
              <FiChevronDown className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <FiChevronDown className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <FiPlus className="mr-2" />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Projects</p>
          <p className="text-2xl font-bold mt-1 text-gray-800">{projects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Active</p>
          <p className="text-2xl font-bold mt-1 text-blue-600">
            {projects.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Completed</p>
          <p className="text-2xl font-bold mt-1 text-green-600">
            {projects.filter(p => p.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Budget</p>
          <p className="text-2xl font-bold mt-1 text-purple-600">
            ${projects.reduce((sum, project) => sum + parseInt(project.budget.replace(/[^0-9]/g, '')), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Progress</h2>
        <div className="h-64">
          <Bar 
            data={projectStatusData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: {
                    display: true,
                    text: 'Completion %'
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <FiDollarSign className="mr-1" /> {project.budget}
                    </div>
                    <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadge(project.priority)}`}>
                      {project.priority} priority
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(project.status)}
                      <span className="ml-2 capitalize">{project.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, i) => (
                        <div key={i} className="h-8 w-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-800 text-xs font-medium">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-800 text-xs font-medium">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(project.startDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      <FiCalendar className="inline mr-1" />
                      {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          project.status === 'completed' ? 'bg-green-500' :
                          project.status === 'on hold' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {project.progress}% complete
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEdit2 />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => deleteProject(project.id)}
                      >
                        <FiTrash2 />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FiMoreVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;