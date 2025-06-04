import React, { useState } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiFilter, 
  FiChevronDown, 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiBriefcase,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiMoreVertical
} from 'react-icons/fi';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const Contacts = () => {
  // Dummy contact data
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@acme.com',
      phone: '(555) 123-4567',
      company: 'Acme Corporation',
      position: 'CTO',
      status: 'active',
      lastContact: '2023-06-15',
      tags: ['Decision Maker', 'Technical'],
      starred: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@technova.com',
      phone: '(555) 987-6543',
      company: 'TechNova Inc',
      position: 'Product Manager',
      status: 'active',
      lastContact: '2023-06-10',
      tags: ['Influencer'],
      starred: false
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@globalsol.com',
      phone: '(555) 456-7890',
      company: 'Global Solutions',
      position: 'Director of Engineering',
      status: 'active',
      lastContact: '2023-05-28',
      tags: ['Decision Maker', 'Budget Holder'],
      starred: true
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma@innotech.com',
      phone: '(555) 789-0123',
      company: 'InnoTech Labs',
      position: 'CEO',
      status: 'inactive',
      lastContact: '2023-03-15',
      tags: ['Executive'],
      starred: false
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david@digitalcreations.com',
      phone: '(555) 234-5678',
      company: 'Digital Creations',
      position: 'Head of Design',
      status: 'active',
      lastContact: '2023-06-12',
      tags: ['Influencer'],
      starred: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  // Chart data
  const contactStatusData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [
          contacts.filter(c => c.status === 'active').length,
          contacts.filter(c => c.status === 'inactive').length
        ],
        backgroundColor: [
          '#10B981', // green
          '#E5E7EB'  // gray
        ],
        borderWidth: 0
      }
    ]
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    const matchesTag = tagFilter === 'all' || contact.tags.includes(tagFilter);
    return matchesSearch && matchesStatus && matchesTag;
  });

  const toggleStar = (id) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? {...contact, starred: !contact.starred} : contact
    ));
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // Get all unique tags
  const allTags = Array.from(new Set(contacts.flatMap(contact => contact.tags)));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Contact Management</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search contacts..."
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
                <option value="inactive">Inactive</option>
              </select>
              <FiChevronDown className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
              >
                <option value="all">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <FiPlus className="mr-2" />
              Add Contact
            </button>
          </div>
        </div>
      </div>

      {/* Stats and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Total Contacts</p>
            <p className="text-2xl font-bold mt-1 text-gray-800">{contacts.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Active Contacts</p>
            <p className="text-2xl font-bold mt-1 text-green-600">
              {contacts.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Starred</p>
            <p className="text-2xl font-bold mt-1 text-yellow-500">
              {contacts.filter(c => c.starred).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Companies</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">
              {new Set(contacts.map(c => c.company)).size}
            </p>
          </div>
        </div>

        {/* Contact Status Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Status</h2>
          <div className="h-64 flex">
            <div className="w-1/2">
              <Pie 
                data={contactStatusData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }} 
              />
            </div>
            <div className="w-1/2 pl-6 flex flex-col justify-center">
              <div className="space-y-3">
                {contactStatusData.labels.map((label, index) => (
                  <div key={label} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: contactStatusData.datasets[0].backgroundColor[index] }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {label}: {contactStatusData.datasets[0].data[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button 
                        onClick={() => toggleStar(contact.id)}
                        className="mr-2 text-gray-400 hover:text-yellow-500"
                      >
                        <FiStar className={contact.starred ? "fill-yellow-400 text-yellow-400" : ""} />
                      </button>
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiUser className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiBriefcase className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{contact.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <FiPhone className="mr-1 text-gray-400" /> {contact.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <FiMail className="mr-1 text-gray-400" /> {contact.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(contact.lastContact).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEdit2 />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => deleteContact(contact.id)}
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

export default Contacts;