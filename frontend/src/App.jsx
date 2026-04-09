import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TouristLoginPage from "./pages/TouristLoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import DistrictPage from "./pages/DistrictPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import AdminProfilePage from "./pages/AdminProfilePage";
import FeedbackPage from "./pages/FeedbackPage";
import NotFoundPage from "./pages/NotFoundPage";

function PageShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col text-slate-900 selection:bg-purple-200 overflow-hidden relative">
      <div className="flex flex-col flex-grow relative z-0">
        {children}
      </div>
    </div>
  );
}

function AnimatedRoutes({ role, setRole }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-grow"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/tourist-login" element={<TouristLoginPage setRole={setRole} />} />
          <Route path="/admin-login" element={<AdminLoginPage setRole={setRole} />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/district/:districtId" element={<DistrictPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin-profile" element={<AdminProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  const [onlineData, setOnlineData] = useState({ onlineCount: 0, onlineUsers: [] });

  useEffect(() => {
    // Check initial auth state
    if (localStorage.getItem("token") && !role) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.user?.role) setRole(user.user.role);
      else if (user?.role) setRole(user.role);
    }

    const fetchOnlineCount = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users/online");
        if (res.ok) {
          const data = await res.json();
          setOnlineData({ onlineCount: data.onlineCount, onlineUsers: data.onlineUsers || [] });
        }
      } catch (err) {
        console.error("Failed to fetch online members count");
      }
    };

    const pingActivity = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        await fetch("http://localhost:5001/api/users/ping", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("Failed to ping session activity");
      }
    };

    // Initial calls
    fetchOnlineCount();
    pingActivity();

    // Heartbeat every 60 seconds
    const intervalId = setInterval(() => {
      fetchOnlineCount();
      pingActivity();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [role]);

  return (
    <Router>
      <PageShell>
        <Navbar role={role} setRole={setRole} onlineData={onlineData} setOnlineData={setOnlineData} />
        <AnimatedRoutes role={role} setRole={setRole} />
        <Footer />
      </PageShell>
    </Router>
  );
}

