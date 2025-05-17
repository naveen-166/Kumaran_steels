import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosClient } from '../AxiosClient';

// Icons
import { HiHome, HiCog, HiClipboardList, HiPhoneOutgoing, HiArrowLeft } from 'react-icons/hi';

// Chart Libraries
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Toast
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPanel = () => {
  const { name, islogged, setemail, setname, setislogged } = useContext(Authcontext);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [requestStats, setRequestStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navItems = [
    { name: 'Dashboard', path: '/admin-panel', icon: <HiHome /> },
    { name: 'Update Services', path: '/admin/update-services', icon: <HiCog /> },
    { name: 'Update Products', path: '/admin/update-products', icon: <HiClipboardList /> },
    { name: 'Callback Requests', path: '/ad/request', icon: <HiPhoneOutgoing /> },
  ];

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

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false); // Close sidebar on mobile resize
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [islogged, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('islogged');
    setemail('');
    setname('');
    setislogged(false);
    toast.success("Logged out successfully!");
    navigate('/');
  };

  const SingleDoughnutChart = ({ label, value, color }) => {
    const data = {
      labels: [label, ''],
      datasets: [
        {
          label,
          data: [value, 100 - value],
          backgroundColor: [color, '#e5e7eb'],
          borderColor: ['#ffffff', '#ffffff'],
          borderWidth: 2,
          cutout: '70%',
          borderRadius: 5,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
          },
        },
        title: {
          display: false,
        },
      },
    };

    return (
      <div className="w-full h-[150px] flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'
          } fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out h-screen bg-white shadow-xl flex flex-col`}
        onMouseEnter={() => window.innerWidth >= 768 && setSidebarOpen(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setSidebarOpen(false)}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {sidebarOpen && <h1 className="text-xl font-bold text-indigo-700">Sri Kumaran Steels</h1>}
          {!sidebarOpen && <span className="text-indigo-700 font-bold text-lg">SKS</span>}
        </div>

        <nav className="mt-6 px-2 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="group w-full flex justify-start items-center px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-800 transition-all"
              title={item.name}
            >
              <span className="text-indigo-600 group-hover:text-indigo-800">{item.icon}</span>
              <span
                className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-40' : 'opacity-0 w-0'
                  }`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-20 lg:ml-64 transition-all duration-300 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="  p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')} // Back button
              className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
              title="Go Back"
            >
              <HiArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <p className=' text-sm underline hover:cursor-pointer' onClick={() => { navigate('/') }}>Go to Home</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2"
              >
                <span>{name || 'Admin'}</span>
                <img
                  src="https://ui-avatars.com/api/?name=Sree+Kumaran&background=random "
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-200">
                  <button
                    onClick={() => {
                      navigate('/admin/profile');
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>


        {/* Welcome Message */}
        <section className="p-6">
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-xl shadow-md transform transition-transform hover:scale-[1.01]">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {name}!</h2>
            <p>Here's a summary of your recent business activity and upcoming tasks.</p>
          </div>
        </section>

        {/* Charts Section */}
        <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white shadow-md rounded-lg p-5">
                <SkeletonLoader />
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-500 font-medium py-6">{error}</div>
          ) : (
            <>
              <ChartCard title="Total Enquiries" value={requestStats.total}>
                <SingleDoughnutChart label="Total" value={100} color="#3b82f6" />
              </ChartCard>
              <ChartCard title="Completed" value={requestStats.completed}>
                <SingleDoughnutChart label="Completed" value={Math.round((requestStats.completed / requestStats.total) * 100) || 0} color="#10b981" />
              </ChartCard>
              <ChartCard title="Pending" value={requestStats.pending}>
                <SingleDoughnutChart label="Pending" value={Math.round((requestStats.pending / requestStats.total) * 100) || 0} color="#f59e0b" />
              </ChartCard>
            </>
          )}
        </section>
      </main>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

// StatCard Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-center">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
  </div>
);

// Chart Card Component
const ChartCard = ({ title, value, children }) => (
  <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold mb-1 text-gray-800">{title}</h3>
    <p className="text-2xl font-bold mb-4 text-gray-700">{value}</p>
    <div className="w-full h-[150px] flex items-center justify-center">
      {children}
    </div>
  </div>
);

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  </div>
);

export default AdminPanel;