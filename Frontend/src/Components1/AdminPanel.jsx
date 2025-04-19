import React, { useContext } from 'react';
import { Authcontext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { name } = useContext(Authcontext);
  const navigate = useNavigate();

  const cards = [
    { title: 'Update Services', onClick: () => navigate('/admin/update-services') },
    { title: 'Update Products', onClick: () => navigate('/admin/update-products') },
    { title: 'Login Activities', onClick: () => navigate('/admin/login-activities') },
    { title: 'Callback Requests', onClick: () => navigate('/admin/callback-requests') },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Sree Kumaran Steels</h1>

      <p className="text-center text-lg text-gray-700 mb-8">
        Welcome back, <span className="font-semibold text-black">{name || 'Admin'}</span>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="cursor-pointer bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold text-center text-gray-800">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
