import {BrowserRouter, Route, Routes} from "react-router-dom"
import Auth from "./Pages/Auth/Auth"
import './App.css'
import Landing from "./Pages/Landing/Landing"
import Profile from "./Pages/Profile/Profile"
import Jobs from "./Pages/Jobs/Jobs"

function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path="/auth" element = {<Auth/>} />
     <Route path="/" element = {<Landing/>}/>
     <Route path="/profile" element = {<Profile/>}/>
     <Route path="/jobs" element={<Jobs />} />
     </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
