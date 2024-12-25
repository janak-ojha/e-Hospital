import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import FirstPage from "./Components/FirstPage/FirstPage";
import Homes from "./Components/homePage/Home";
import Login from "./Components/pages/Login";
import Registration from "./Components/pages/Registration";
import AdminDashboard from "./Components/Admin/Dashboard/AdminDashboard";
import DashboardLayoutSidebarCollapsed from "./Components/Admin/Dashboard/AdminHome";
import Resetpassword from "./Components/pages/Resetpassword";
import AdminDrawer from "./Components/Admin/Dashboard/AdminHome";
import DoctorDashboard from "./Components/Doctor/Dashboard/DoctorDashboard";
import { useSelector } from 'react-redux';
// import { DashboardLayoutSidebarCollapsed  } from "./Components/Admin/Dashboard/AdminHome/DashboardLayoutSidebarCollapsed"; // Assuming you want to add this page here

function App() {
  const { currentRole } = useSelector(state => state.user);
  return (
    <Router>
      {currentRole === null &&
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<FirstPage />} />
        <Route path="/home" element={<Homes />} />
        <Route path="/registeradmin" element={<Registration />} />
        
        {/* Login Routes with Roles */}
        <Route path="/adminlogin" element={<Login role={"Admin"} />} />
        <Route path="/registrationlogin" element={<Login role={"Registration"} />} />
        <Route path="/doctorlogin" element={<Login role={"Doctor"} />} />
        <Route path="/labtechnicianlogin" element={<Login role={"Lab"} />} />
        <Route path="/pharmalogin" element={<Login role={"Pharma"} />} />
        
        {/* Admin Routes */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/DoctorDashboard" element={<DoctorDashboard/>}/>
        {/* <Route path="/Adminhome" element={<AdminHome />} /> */}
        
        {/* Reset Password Route */}
        <Route path="/resetpassword/:role" element={<Resetpassword />} />
        
        {/* Protected or additional routes */}
        {/* <Route path="/Adminhome" element={<AdminDrawer/>}/> */}
        
      
        <Route path="*" element={<Navigate to="/" />} />
      
      </Routes>}
      {currentRole === "Admin" &&
        <>
          <AdminDrawer/>
        </>
      }
      {currentRole === "Doctor"&& 
      <>
      <DoctorDashboard/>
      </>
}
    </Router>
  );
}

export default App;
