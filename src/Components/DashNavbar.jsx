import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DashNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gradient-to-r from-gray-800 to-gray-800 text-white shadow-xl sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/dashboard" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
            CAREER-CHOWK
          </Link>
        </motion.div>

        {/* Logout button */}
        <motion.button 
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition-colors"
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default DashNavbar;
