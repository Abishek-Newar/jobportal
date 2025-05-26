import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./Pages/Auth/Auth"
import './App.css'
import Landing from "./Pages/Landing/Landing"
import Jobs from "./Pages/users/Jobs"
import MyApplications from "./Pages/users/MyApplications"
import UserProfile from "./Pages/users/UserProfile" 
import EmployerDashboard from "./Pages/Employer/EmployerDashboard"
import EmployerAuth from "./Pages/Employer/EmployerAuth"
import PersonalDetails from "./Pages/SignupFlow/PersonalDetails"
import ProfileSummary from "./Pages/SignupFlow/ProfileSummary"
import Experience from "./Pages/SignupFlow/Experience"
import Education from "./Pages/SignupFlow/Education"
import Contact from "./Pages/contact/contact"
import Layout from "./Pages/layout"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>

            <Route index element={<Landing />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/my-applications" element={<MyApplications />} />

            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            {/* Signup Flow Routes */}

            <Route path="/signup/*">
              <Route path="personal-details" element={<PersonalDetails />} />
              <Route path="profile-summary" element={<ProfileSummary />} />
              <Route path="experience" element={<Experience />} />
              <Route path="education" element={<Education />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Route>

          <Route path="/auth" element={<Auth />} />
          <Route path="/employer/auth" element={<EmployerAuth />} />
        </Routes>
      </BrowserRouter>
    </>


  )
}

export default App
