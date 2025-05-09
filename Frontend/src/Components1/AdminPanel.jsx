import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosClient } from '../AxiosClient';

const AdminPanel = () => {
  const { name, islogged, setemail, setname, setislogged } = useContext(Authcontext);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [requestStats, setRequestStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequestData = async () => {
    try {
      const res = await axiosClient.get('contact/fetchRequests');
      const total = res.data.length;
      const completed = res.data.filter(item => item.status === true).length;
      const pending = res.data.filter(item => item.status === false).length;
      setRequestStats({ total, completed, pending });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching request data:", err);
      setError("Failed to load request stats.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!islogged) {
      navigate('/');
    } else {
      fetchRequestData();
    }
  }, [islogged, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('islogged');
    setemail('');
    setname('');
    setislogged(false);
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin-panel' },
    { name: 'Update Services', path: '/admin/update-services' },
    { name: 'Update Products', path: '/admin/update-products' },
    { name: 'Callback Requests', path: '/ad/request' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 h-screen fixed z-50`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {sidebarOpen && <h1 className="text-xl font-bold text-blue-700">Sree Kumaran Steels</h1>}
        </div>
        <nav className="mt-6 px-2 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-200 text-gray-800"
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navbar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
                <span className="text-gray-800">{name || 'Admin'}</span>
                <img
                  src="https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                  <button
                    onClick={() => navigate('/admin/profile')}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500 font-medium py-6">
              {error}
            </div>
          ) : (
            <>
              <StatCard title="Total Inquiries" value={requestStats.total} icon="📊" color="text-gray-800" />
              <StatCard title="Completed" value={requestStats.completed} icon="✅" color="text-green-600" />
              <StatCard title="Pending" value={requestStats.pending} icon="⏳" color="text-yellow-500" />
            </>
          )}
        </section>

        {/* Welcome Message */}
        <section className="p-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {name}!</h2>
            <p>Here's what’s happening with your business today.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

// Reusable StatCard component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white shadow-md rounded-lg p-5 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="flex justify-between items-center">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
  </div>
);

export default AdminPanel;
