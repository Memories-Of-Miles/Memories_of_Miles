import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000/api',               // Used for local development
  baseURL: 'http://65.2.73.140:3000/api',       // Production API URL
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// In your backend auth.controller.js
export const signin = async (req, res, next) => {
  // ...existing code...
  
  try {
    // After validation
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...userData } = validUser._doc;
    
    res.status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({
        success: true,
        token, // Important: Include token in response body
        user: userData
      });
  } catch (error) {
    next(error);
  }
};
