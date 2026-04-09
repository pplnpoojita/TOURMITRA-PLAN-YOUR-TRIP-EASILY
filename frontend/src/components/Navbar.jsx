import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, ShieldCheck, User, X } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Navbar({ role, setRole, onlineData = { onlineCount: 0, onlineUsers: [] }, setOnlineData }) {
  const [open, setOpen] = useState(false);
  const [showUsersPopover, setShowUsersPopover] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch("http://localhost:5001/api/users/logout", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("Logout failed", err);
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setRole(null);
    navigate("/");
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Profile", to: role === 'admin' ? "/admin-profile" : "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 flex flex-col shadow-sm">
      <div className="w-full bg-slate-900 py-2 overflow-hidden border-b border-slate-800">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap text-xs font-bold tracking-widest text-teal-400 uppercase"
        >
          <span className="px-4">Tour Mitra - Plan Your Trip Easy</span>
          <span className="px-4 text-slate-500">•</span>
          <span className="px-4">Tour Mitra - Plan Your Trip Easy</span>
          <span className="px-4 text-slate-500">•</span>
          <span className="px-4">Tour Mitra - Plan Your Trip Easy</span>
          <span className="px-4 text-slate-500">•</span>
          <span className="px-4">Tour Mitra - Plan Your Trip Easy</span>
        </motion.div>
      </div>
      <div className="mx-auto w-full flex max-w-7xl items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl md:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-4 py-2 text-sm font-medium transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-slate-900"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-700 hover:text-slate-900"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!role ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/tourist-login" className="flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <span className="inline-flex items-center"><User className="mr-2 h-4 w-4" /> Tourist Login</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/admin-login" className="flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                  <span className="inline-flex items-center"><ShieldCheck className="mr-2 h-4 w-4" /> Admin Login</span>
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Logout
            </motion.button>
          )}
          <div className="relative">
            <button 
              onClick={() => setShowUsersPopover(!showUsersPopover)}
              className="ml-2 flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/50 px-3 py-1.5 text-xs font-semibold text-teal-700 backdrop-blur-sm shadow-sm hover:bg-teal-100 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
              </span>
              Live: {onlineData.onlineCount} Online
            </button>
            
            {showUsersPopover && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50">
                <h4 className="border-b border-slate-100 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Active Explorers
                </h4>
                {onlineData.onlineUsers && onlineData.onlineUsers.length > 0 ? (
                  <ul className="max-h-48 overflow-y-auto space-y-2">
                    {onlineData.onlineUsers.map((u, i) => (
                      <li key={i} className="flex flex-col text-sm text-slate-700">
                        <span className="font-semibold">{u.name}</span>
                        <span className="text-[10px] text-slate-400 capitalize">{u.role}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 text-center py-2">No active users</p>
                )}
              </div>
            )}
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-2">
            <Link
              to="/feedback"
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${location.pathname === "/feedback" ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-100"}`}
            >
              Feedback
            </Link>
          </motion.div>
        </div>

        <button className="rounded-xl border border-slate-200 p-2 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {!role ? (
              <>
                <Link to="/tourist-login" onClick={() => setOpen(false)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                  Tourist Login
                </Link>
                <Link to="/admin-login" onClick={() => setOpen(false)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
                  Admin Login
                </Link>
              </>
            ) : (
              <button 
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }} 
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-left font-medium text-slate-600 hover:bg-slate-100"
              >
                Logout
              </button>
            )}
            <button 
              onClick={() => setShowUsersPopover(!showUsersPopover)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-teal-100 bg-teal-50 p-3 text-sm font-medium text-teal-700 hover:bg-teal-100 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
              </span>
              Live: {onlineData.onlineCount} Members Online
            </button>
            {showUsersPopover && (
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-inner">
                <h4 className="border-b border-slate-200 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                  Active Explorers
                </h4>
                {onlineData.onlineUsers && onlineData.onlineUsers.length > 0 ? (
                  <ul className="max-h-40 overflow-y-auto space-y-2 text-center">
                    {onlineData.onlineUsers.map((u, i) => (
                      <li key={i} className="flex flex-col text-sm text-slate-700">
                        <span className="font-semibold">{u.name}</span>
                        <span className="text-[10px] text-slate-400 capitalize">{u.role}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 text-center py-2">No active users</p>
                )}
              </div>
            )}
            <NavLink
              to="/feedback"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `mt-2 rounded-xl px-4 py-3 border border-slate-200 text-center text-sm font-medium ${isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`
              }
            >
              Feedback
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
