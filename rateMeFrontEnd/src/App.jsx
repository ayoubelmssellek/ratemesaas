// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./MainHomePage/Home";
import Login from "./AuthComponents/Login";
import Register from "./AuthComponents/Register";
import DashboardLayout from "./AdminComponents/DashboardLayout";
import DashboardOverview from "./AdminComponents/DashboardOverview";
import Reviews from "./AdminComponents/DashboardPages/Reviews";
import Settings from "./AdminComponents/DashboardPages/Settings";
import QRCodes from "./AdminComponents/DashboardPages/QRCodes";
import SocialLinks from "./AdminComponents/DashboardPages/ConnectivitySettings";
import Analytics from "./AdminComponents/DashboardPages/Analytics";
import { Suspense } from "react";
import "./hooks/i18n"; // Import the i18n configuration
import ConnectivitySettings from "./AdminComponents/DashboardPages/ConnectivitySettings";
import ChangePassword from "./AuthComponents/ForgetPassword";
import ResetPassword from "./AuthComponents/ResetPassword";
import VerifyCode from "./AuthComponents/VerifyCode";
import VerfiyGmail from "./AuthComponents/VerifyEmail";
import { useQuery } from "@tanstack/react-query";
import { me } from "./API/auth";


function App() {
  // const loggedIn = localStorage.getItem("loggedIn") === "true";
  //  //Fetch current user after login
  // const { data: userData } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: me,
  //   enabled: loggedIn, // fetch only after login
  //   staleTime: 1000 * 60 * 5,
  //   retry: 1,
  // });
  // console.log("userData:", userData);
  
  return (
         <Suspense fallback={<div>Loading translations...</div>}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-email" element={<VerfiyGmail />} />
          
          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="qr-codes" element={<QRCodes />} />
            <Route path="connectivity-settings" element={<ConnectivitySettings />} />
            {/* <Route path="feedback" element={<Feedback />} /> */}
            <Route path="social" element={<SocialLinks />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
     </Suspense>
  );
}

export default App;