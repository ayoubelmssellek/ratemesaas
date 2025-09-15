// App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./MainHomePage/Home";
import Login from "./AuthComponents/Login";
import Register from "./AuthComponents/Register";
import DashboardLayout from "./AdminComponents/DashboardLayout";
import DashboardOverview from "./AdminComponents/DashboardOverview";
import Reviews from "./AdminComponents/DashboardPages/Reviews";
import QRCodes from "./AdminComponents/DashboardPages/QRCodes";
import SocialLinks from "./AdminComponents/DashboardPages/ConnectivitySettings";
import Analytics from "./AdminComponents/DashboardPages/Analytics";
import { Suspense, useEffect } from "react";
import "./hooks/i18n"; // Import the i18n configuration
import ConnectivitySettings from "./AdminComponents/DashboardPages/ConnectivitySettings";
import ChangePassword from "./AuthComponents/ForgetPassword";
import ResetPassword from "./AuthComponents/ResetPassword";
import VerifyCode from "./AuthComponents/VerifyCode";
import VerfiyGmail from "./AuthComponents/VerifyEmail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logoutUser, me } from "./API/auth";
import Profile from "./AdminComponents/ProfilePage";
import Notifications from "./AdminComponents/Notifications";


function App() {
  const navigate = useNavigate();
   
  const queryClient = useQueryClient();
 const isLogged = localStorage.getItem('islogged') === 'true';

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: me,
    enabled: isLogged,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    onError: (err) => {
      if (err.response?.status !== 401) console.error(err);
    },
  });
  localStorage.setItem('user_id', userData?.id || '');

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.setItem('islogged', 'false');
      queryClient.clear();
      navigate('/');
      console.log('Logged out successfully');
    },
    onError: () => {
      localStorage.setItem('islogged', 'false');
      queryClient.clear();
      navigate('/');
    },
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'islogged') {
        const loggedIn = localStorage.getItem('islogged') === 'true';
        if (!loggedIn) {
          logoutMutation.mutate();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logoutMutation]);

  if (isLoading) return   <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </section>;

  if (isError) {
    localStorage.setItem('islogged', 'false');
  }

  return (
         <Suspense fallback={<div>Loading translations...</div>}>
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
            <Route path="notifications" element={<Notifications/>} />
            <Route path="profile" element={<Profile />} />
            <Route path="qr-codes" element={<QRCodes />} />
            <Route path="connectivity-settings" element={<ConnectivitySettings />} />
            {/* <Route path="feedback" element={<Feedback />} /> */}
            <Route path="social" element={<SocialLinks />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
     </Suspense>
  );
}

export default App;