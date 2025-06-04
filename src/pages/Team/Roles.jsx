import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiCheckCircle,
  FiChevronDown,
  FiXCircle,
  FiShield,
  FiCode,
  FiLayers,
  FiUsers
} from 'react-icons/fi';

const Roles = () => {
  // Enhanced roles data structure for agency CRM
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Administrator',
      description: 'Full system access and settings management',
      memberCount: 2,
      department: 'Management',
      permissions: ['all'],
      createdAt: '2023-01-15',
      isSystemRole: true
    },
    {
      id: 2,
      name: 'Project Manager',
      description: 'Oversees project execution and team coordination',
      memberCount: 4,
      department: 'Management',
      permissions: ['projects:full', 'reports:view', 'team:manage'],
      createdAt: '2023-03-10',
      isSystemRole: false
    },
    {
      id: 3,
      name: 'Senior Developer',
      description: 'Leads technical implementation and code reviews',
      memberCount: 5,
      department: 'Engineering',
      permissions: ['code:push', 'reviews:create', 'tasks:update'],
      createdAt: '2023-02-20',
      isSystemRole: false
    },
    {
      id: 4,
      name: 'UX Designer',
      description: 'Creates user interfaces and experience flows',
      memberCount: 3,
      department: 'Design',
      permissions: ['design:create', 'prototypes:manage', 'feedback:review'],
      createdAt: '2023-04-05',
      isSystemRole: false
    },
    {
      id: 5,
      name: 'QA Engineer',
      description: 'Ensures software quality through testing',
      memberCount: 4,
      department: 'Engineering',
      permissions: ['tests:create', 'bugs:report', 'releases:verify'],
      createdAt: '2023-05-12',
      isSystemRole: false
    },
    {
      id: 6,
      name: 'Account Manager',
      description: 'Manages client relationships and communications',
      memberCount: 3,
      department: 'Sales',
      permissions: ['clients:manage', 'invoices:view'],
      createdAt: '2023-06-18',
      isSystemRole: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const rolesPerPage = 5;

  // Get unique departments for filter
  const departments = ['All', ...new Set(roles.map(role => role.department))];

  // Filter roles based on search and department
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || role.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  // Pagination logic
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  // Role icon mapping
  const getRoleIcon = (roleName) => {
    switch(roleName) {
      case 'Administrator': return <FiShield className="text-purple-600" />;
      case 'Project Manager': return <FiUsers className="text-blue-600" />;
      case 'Senior Developer': 
      case 'QA Engineer': return <FiCode className="text-green-600" />;
      case 'UX Designer': return <FiLayers className="text-orange-600" />;
      case 'Account Manager': return <FiUsers className="text-red-600" />;
      default: return <FiUsers className="text-gray-600" />;
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedRole.isSystemRole) {
      setSuccessMessage('System roles cannot be deleted');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setShowDeleteModal(false);
      return;
    }

    setRoles(roles.filter(role => role.id !== selectedRole.id));
    setShowDeleteModal(false);
    setSuccessMessage(`Role "${selectedRole.name}" deleted successfully`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Roles Management</h2>
          <p className="text-gray-500 mt-2">Manage team roles and permissions</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/roles/add"
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiPlus size={18} />
            <span>Add New Role</span>
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-emerging-50/90 text-emerald-800 rounded-xl flex items-center gap-3 border border-emerald-200 backdrop-blur-sm">
          <FiCheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search roles by name or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-11 pr-4 h-12 block w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
          />
        </div>
        <div className="relative w-full md:w-48">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 h-12 block w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FiChevronDown className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-8 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRoles.length > 0 ? (
              currentRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50/50 transition-all duration-150">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-gray-100">
                        {getRoleIcon(role.name)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {role.name}
                          {role.isSystemRole && (
                            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                              System
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {role.memberCount} {role.memberCount === 1 ? 'member' : 'members'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-gray-600 max-w-md">{role.description}</div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {role.department}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(role.createdAt)}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <Link
                        to={`/roles/edit/${role.id}`}
                        className="text-indigo-600 hover:text-indigo-900 transition-all duration-200 p-2 rounded-lg hover:bg-indigo-50 flex items-center justify-center"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(role)}
                        disabled={role.isSystemRole}
                        className={`transition-all duration-200 p-2 rounded-lg flex items-center justify-center ${
                          role.isSystemRole 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-rose-600 hover:text-rose-900 hover:bg-rose-50'
                        }`}
                        title={role.isSystemRole ? "System roles cannot be deleted" : "Delete"}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-8 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FiSearch size={24} className="text-gray-400" />
                    <p className="text-lg">No roles found matching your criteria</p>
                    {(searchTerm || departmentFilter !== 'All') && (
                      <button 
                        onClick={() => {
                          setSearchTerm('');
                          setDepartmentFilter('All');
                        }} 
                        className="text-indigo-600 hover:text-indigo-800 mt-2 text-sm font-medium"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredRoles.length > rolesPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{indexOfFirstRole + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(indexOfLastRole, filteredRoles.length)}
            </span>{' '}
            of <span className="font-medium">{filteredRoles.length}</span> roles
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              aria-label="Previous page"
            >
              <FiChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-11 h-11 rounded-xl border transition-all duration-200 shadow-sm ${
                  currentPage === number
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                aria-label={`Page ${number}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              aria-label="Next page"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full animate-scale-in">
            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 rounded-full bg-rose-100 mt-0.5">
                <FiXCircle size={24} className="text-rose-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Delete Role</h3>
                <p className="text-gray-600 mt-2">
                  Are you sure you want to delete the role "{selectedRole?.name}"? This action cannot be undone.
                </p>
                {selectedRole?.memberCount > 0 && (
                  <div className="mt-3 p-3 bg-amber-50 text-amber-800 rounded-lg text-sm">
                    This role is assigned to {selectedRole.memberCount} members. Deleting it will unassign these members.
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all duration-200 shadow-sm"
              >
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;