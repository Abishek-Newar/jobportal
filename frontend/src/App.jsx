import {BrowserRouter, Route, Routes} from "react-router-dom"
import Auth from "./Pages/Auth/Auth"
import './App.css'
import Landing from "./Pages/Landing/Landing"
import Profile from "./Pages/Profile/Profile"
import Jobs from "./Pages/users/Jobs"
import EmployerDashboard from "./Pages/Employer/EmployerDashboard"
import EmployerAuth from "./Pages/Employer/EmployerAuth"
import PersonalDetails from "./Pages/SignupFlow/PersonalDetails"
import ProfileSummary from "./Pages/SignupFlow/ProfileSummary"
import Experience from "./Pages/SignupFlow/Experience"
import Education from "./Pages/SignupFlow/Education"

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path="/auth" element = {<Auth/>} />
     <Route path="/" element = {<Landing/>}/>
     <Route path="/profile" element = {<Profile/>}/>
     <Route path="/jobs" element={<Jobs />} />
     <Route path="/employer/auth" element={<EmployerAuth/>} />
     <Route path="/employer/dashboard" element={<EmployerDashboard />} />
     {/* Signup Flow Routes */}
     <Route path="/signup/personal-details" element={<PersonalDetails />} />
     <Route path="/signup/profile-summary" element={<ProfileSummary />} />
     <Route path="/signup/experience" element={<Experience />} />
     <Route path="/signup/education" element={<Education />} />
     </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
