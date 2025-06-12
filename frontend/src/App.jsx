import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import PrivateRoute from "./components/PrivateRoute"
import ProfileEdit from "./pages/Home/ProfileEdit"
import Footer from "./components/Footer"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsOfService from "./pages/TermsOfService"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/" exact element={<Home />} />
              </Route>

              <Route path="/login" exact element={<Login />} />
              <Route path="/sign-up" exact element={<SignUp />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
