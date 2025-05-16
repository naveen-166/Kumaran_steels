import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Authcontext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../AxiosClient';

export default function EnquireDisplay() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { islogged } = useContext(Authcontext);
  const navigate = useNavigate();

  const itemsPerPage = 6;

  useEffect(() => {
    if (!islogged) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [islogged, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('contact/fetchRequests');
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setTimeout(() => setLoading(false), 500); // Simulate loading delay for UX
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axiosClient.put(`contact/updateStatus/${id}`, {
        status: !currentStatus,
      });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: !currentStatus } : req))
      );
      if (selectedRequest && selectedRequest._id === id) {
        setSelectedRequest({ ...selectedRequest, status: !currentStatus });
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === 'Completed') return req.status;
    if (filter === 'Incomplete') return !req.status;
    return true;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <svg
  fill="#7c7979"
  className='size-9 ml-1 fill-gray-700 hover:cursor-pointer hover:scale-105 hover:bg-gray-200 rounded-2xl'
  version="1.1"
  id="Capa_1"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 219.151 219.151"
  stroke="#7c7979"
  onClick={()=>{navigate('/admin-panel')}}
>
  <g>
    <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575 C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575 c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z" />
    <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008 c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825 c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628 c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z" />
  </g>
</svg>

          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Inquiry Requests</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full md:w-auto px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition duration-200"
          >
            <option value="All">All Requests</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-xl text-gray-500">No requests found.</p>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedRequests.map((req, index) => (
                <div
                  key={req._id}
                  onClick={() => setSelectedRequest(req)}
                  className={`bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                    index % 2 === 0 ? 'animate-fade-in-up' : 'animate-fade-in-down'
                  }`}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">{req.name}</h2>
                    <p><strong className="text-gray-600">Email:</strong> {req.email || 'N/A'}</p>
                    <p><strong className="text-gray-600">Phone:</strong> {req.phone}</p>
                    <p><strong className="text-gray-600">Category:</strong> {req.category}</p>
                    <span
                      className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium ${
                        req.status
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {req.status ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`px-5 py-2 rounded-lg text-sm font-medium ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition`}
                >
                  Previous
                </button>
                <span className="text-gray-600 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2 rounded-lg text-sm font-medium ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
              <div className="p-6 relative">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light"
                >
                  &times;
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Inquiry Details</h2>

                <div className="space-y-4 text-gray-700">
                  <p><strong className="text-gray-800">Name:</strong> {selectedRequest.name}</p>
                  <p><strong className="text-gray-800">Email:</strong> {selectedRequest.email || 'N/A'}</p>
                  <p><strong className="text-gray-800">Phone:</strong> {selectedRequest.phone}</p>
                  <p><strong className="text-gray-800">Category:</strong> {selectedRequest.category}</p>
                  <p><strong className="text-gray-800">Description:</strong> {selectedRequest.description}</p>

                  <div>
                    <strong className="text-gray-800">Status:</strong>{' '}
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedRequest.status
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {selectedRequest.status ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() =>
                      toggleStatus(selectedRequest._id, selectedRequest.status)
                    }
                    className={`px-5 py-2 rounded-lg font-medium text-white transition ${
                      selectedRequest.status
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    Mark as {selectedRequest.status ? 'Pending' : 'Completed'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}