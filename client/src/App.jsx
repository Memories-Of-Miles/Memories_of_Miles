import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import PrivateRoute from "./components/PrivateRoute"
import ProfileEdit from "./pages/Home/ProfileEdit"
import Footer from "./components/Footer"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsOfService from "./pages/TermsOfService"
import LandingPage from "./pages/LandingPage" // Import the new page

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              {/* Public Route: Landing Page */}
              <Route path="/" exact element={<LandingPage />} />

              {/* Public Auth Routes */}
              <Route path="/login" exact element={<Login />} />
              <Route path="/sign-up" exact element={<SignUp />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* Protected Routes (Require Login) */}
              <Route element={<PrivateRoute />}>
                {/* The main app logic is now at /dashboard */}
                <Route path="/dashboard" exact element={<Home />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
              </Route>
              
              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          {/* Footer is inside specific pages or global based on preference, 
              but usually Home/Landing handle their own layout or keep it here */}
          {/* <Footer /> */} 
        </div>
      </BrowserRouter>
    </>
  )
}

export default App