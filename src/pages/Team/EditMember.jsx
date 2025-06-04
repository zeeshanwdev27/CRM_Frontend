import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiPhone, FiClock, FiSave, FiArrowLeft } from 'react-icons/fi';

const EditMember = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'Developer',
        status: 'Active',
        joinDate: ''
    });

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/users/allusers`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                const foundMember = response.data.data.find(m => m._id === id);
                if (foundMember) {
                    setMember(foundMember);
                    setFormData({
                        name: foundMember.name,
                        email: foundMember.email,
                        phone: foundMember.phone,
                        role: foundMember.role,
                        status: foundMember.status,
                        joinDate: foundMember.joinDate ? new Date(foundMember.joinDate).toISOString().split('T')[0] : ''
                    });
                } else {
                    throw new Error('Member not found');
                }
            } catch (err) {
                console.error('Error fetching member:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch member');
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [id]);

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
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/api/users/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/team/all-members'); // Redirect back to members list after successful update
        } catch (err) {
            console.error('Error updating member:', err);
            setError(err.response?.data?.message || err.message || 'Failed to update member');
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
                <button 
                    onClick={() => navigate('/team')}
                    className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                    <FiArrowLeft /> Back to Team
                </button>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-gray-500 p-4">Member not found</div>
                <button 
                    onClick={() => navigate('/team')}
                    className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                    <FiArrowLeft /> Back to Team
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Member</h2>
                <button 
                    onClick={() => navigate('/team')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                    <FiArrowLeft /> Back to Team
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                {error && (
                    <div className="text-red-500 p-3 border border-red-100 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="QA Engineer">QA Engineer</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="On Leave">On Leave</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                        <input
                            type="date"
                            name="joinDate"
                            value={formData.joinDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <FiSave size={18} />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditMember;