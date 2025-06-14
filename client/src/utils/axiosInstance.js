import axios from "axios"

const BASE_URL = "http://localhost:3000/api"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // For cookie-based auth
})

// Add request interceptor to include token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token")

    if (token) {
      // Add token to Authorization header
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      console.log("Authentication error: Redirecting to login")
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

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
