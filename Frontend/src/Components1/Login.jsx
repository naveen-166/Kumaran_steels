import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { axiosClient } from '../AxiosClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [ipLocation, setIpLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setemail, setname, setislogged, islogged } = useContext(Authcontext);

  useEffect(() => {
    if (islogged) {
      navigate('/admin-panel');
    }
    fetchIpLocation();

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, [islogged, navigate]);

const fetchIpLocation = async () => {
  try {
    const response = await axios.get('https://ipinfo.io/json?token=8c428c459560af');
    setIpLocation({
      ip: response.data.ip,
      city: response.data.city,
      region: response.data.region,
      country: response.data.country_name || response.data.country || 'Unknown',
      latitude: response.data.loc?.split(',')[0] || 0,
      longitude: response.data.loc?.split(',')[1] || 0,
    });
  } catch (err) {
    console.error('Failed to fetch IP/location:', err);
    alert('Could not fetch IP location');
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axiosClient.post('ad/login', {
        email,
        password,
        ip: ipLocation?.ip || 'Unknown',
        location: ipLocation || {
          city: 'Unknown',
          region: 'Unknown',
          country: 'Unknown',
          latitude: 0,
          longitude: 0,
        },
      });

      const user = response.data.user;

      localStorage.setItem('islogged', 'true');
      localStorage.setItem('email', user.email);
      localStorage.setItem('name', user.name);

      setemail(user.email);
      setname(user.name);
      setislogged(true);

      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        navigate('/admin-panel');
      }, 3000);
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-300 hover:text-white transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.82 9.586H17a1 1 0 110 2H5.82l3.883 3.883a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      </div>

      {/* Login Card with AOS animation */}
      <div data-aos="fade-up" className="max-w-md w-full bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 space-y-6 z-10 transition-all duration-300">
        
        {/* Company Title */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            Sri Kumaran Steels
          </h2>
          <p className="mt-2 text-sm text-gray-300">Admin Portal Login</p>
        </div>

        {/* Success Modal */}
        {successMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <img src="/assets/success.gif" alt="Success" className="w-40 h-40" />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Email */}
          <div data-aos="fade-up">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div data-aos="fade-up">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
              placeholder="••••••••"
            />
          </div>

          {/* Forgot Password */}
          <div data-aos="fade-up" className="text-right">
            <a href="/forgot-password" className="text-sm font-medium text-gray-400 hover:text-gray-200 hover:underline transition duration-200">
              Forgot password?
            </a>
          </div>

          {/* Remember Me */}
          <div data-aos=" fade-up" className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-500 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <div data-aos="fade-up">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-md hover:shadow-lg transition duration-300 disabled:bg-gray-600"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;