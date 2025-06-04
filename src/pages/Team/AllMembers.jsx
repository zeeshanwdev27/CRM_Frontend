import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FiUser,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiMail,
  FiPhone,
  FiClock
} from 'react-icons/fi';

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:3000/api/users/allusers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data && response.data.data) {
          setMembers(response.data.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching members:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Get unique roles for filter dropdown
  const roles = ['All', ...new Set(members.map(member => member.role))];
  const statuses = ['All', 'Active', 'Inactive', 'On Leave'];

  // Filter and sort members based on user selections
  const filteredMembers = members
    .filter(member => {
      const matchesSearch = member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'All' || member.role === filterRole;
      const matchesStatus = filterStatus === 'All' || member.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  // Handle sorting when column header is clicked
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle member deletion
  const deleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMembers(members.filter(member => member._id !== id));
      } catch (err) {
        console.error('Error deleting member:', err);
        setError(err.response?.data?.message || err.message || 'Failed to delete member');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-500 p-4 border border-red-100 bg-red-50 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
          <p className="text-gray-600">
            {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'} found
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            to="/team/add"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus size={18} />
            <span>Add Member</span>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search members by name or email..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'asc' ? 
                    <FiChevronUp className="ml-1" size={16} /> : 
                    <FiChevronDown className="ml-1" size={16} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('role')}
              >
                <div className="flex items-center">
                  Role
                  {sortConfig.key === 'role' && (
                    sortConfig.direction === 'asc' ? 
                    <FiChevronUp className="ml-1" size={16} /> : 
                    <FiChevronDown className="ml-1" size={16} />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {sortConfig.key === 'status' && (
                    sortConfig.direction === 'asc' ? 
                    <FiChevronUp className="ml-1" size={16} /> : 
                    <FiChevronDown className="ml-1" size={16} />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('joinDate')}
              >
                <div className="flex items-center">
                  Joined
                  {sortConfig.key === 'joinDate' && (
                    sortConfig.direction === 'asc' ? 
                    <FiChevronUp className="ml-1" size={16} /> : 
                    <FiChevronDown className="ml-1" size={16} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiUser className="text-blue-600" size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name || 'No name provided'}
                        </div>
                        {member.email && (
                          <div className="text-sm text-gray-500">{member.email}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {member.email && (
                        <div className="flex items-center text-sm text-gray-500">
                          <FiMail className="mr-2" size={14} />
                          {member.email}
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center text-sm text-gray-500">
                          <FiPhone className="mr-2" size={14} />
                          {member.phone}
                        </div>
                      )}
                      {!member.email && !member.phone && (
                        <div className="text-sm text-gray-400">No contact info</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.role ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {member.role}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Not specified</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.status ? (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${member.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          member.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {member.status}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Not specified</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.joinDate ? (
                      <div className="flex items-center">
                        <FiClock className="mr-2" size={14} />
                        {new Date(member.joinDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Not specified</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/team/edit/${member._id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        onClick={() => deleteMember(member._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 cursor-pointer"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No members found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMembers;