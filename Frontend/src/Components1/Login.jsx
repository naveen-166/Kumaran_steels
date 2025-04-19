// pages/Login.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationData from '../Assets/bglog4.json';
import successAnimation from '../Assets/sucess.json';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const generateCaptcha = (length) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
};

const Login = () => {
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [ipLocation, setIpLocation] = useState(null);
  const navigate = useNavigate();

  const { setemail, setname, setislogged } = useContext(Authcontext);

  useEffect(() => {
    setCaptcha(generateCaptcha(6));
    AOS.init();
    fetchIpLocation();
  }, []);

  const fetchIpLocation = async () => {
    try {
      const response = await axios.get('https://ipinfo.io/json'); 
      setIpLocation({
        ip: response.data.ip,
        city: response.data.city,
        region: response.data.region,
        country: response.data.country_name,
        latitude: response.data.latitude,
        longitude: response.data.longitude
      });
    } catch (err) {
      console.error('Failed to fetch IP/location:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptcha !== captcha) {
      setCaptchaError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/ad/login', {
        email,
        password,
        ip: ipLocation?.ip || 'Unknown',
        location: ipLocation || {
          city: 'Unknown',
          region: 'Unknown',
          country: 'Unknown',
          latitude: 0,
          longitude: 0,
        }
      });

      const user = response.data.user;

      // Store in localStorage
      localStorage.setItem('islogged', 'true');
      localStorage.setItem('email', user.email);
      localStorage.setItem('name', user.name);

      // Set context values
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
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-blue-gray-500 text-black">
      <Lottie animationData={animationData} loop style={{ position: 'absolute', width: '50vw', height: '50vh', top: 200, left: 60 }} />

      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <Lottie animationData={successAnimation} loop={false} style={{ width: 400, height: 400 }} />
        </div>
      )}

      <div className="relative w-[450px] p-6 ml-96 -mr-60 bg-white bg-opacity-30 rounded-lg backdrop-blur-md shadow-lg border border-gray-300" data-aos="fade-up" data-aos-duration="1000" style={{ zIndex: 10 }}>
        <p className="text-center text-2xl font-bold">Admin Login</p>

        {captchaError && (
          <p className="text-red-500 text-center mt-2">Incorrect CAPTCHA. Please try again.</p>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div data-aos="fade-right">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border-b border-gray-500 rounded focus:outline-none mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>

          <div data-aos="fade-left">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border-b border-gray-500 rounded focus:outline-none mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          <div className="mt-4" data-aos="fade-right">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium mr-2">
                CAPTCHA: <span className="font-bold">{captcha}</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setCaptcha(generateCaptcha(6));
                  setCaptchaError(false);
                  setUserCaptcha('');
                }}
                className="text-blue-600 text-sm hover:underline"
              >
                Refresh
              </button>
            </div>
            <input
              type="text"
              className={`w-full p-2 mt-1 border rounded-lg text-sm focus:outline-none ${captchaError ? 'border-red-500' : 'border-white'}`}
              placeholder="Enter CAPTCHA"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="/forgot-password" className="hover:underline">Forgot password?</a>
          </div>

          <button type="submit" className="w-full py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
