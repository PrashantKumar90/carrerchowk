import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../Components/DashNavbar";

const DashboardCard = ({ title, description, color, icon, onClick }) => {
  const colors = {
    gray: "from-gray-500 to-gray-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    yellow: "from-yellow-500 to-yellow-600",
    cyan : "from-cyan-700 to-cyan-800",
    blue : "from-blue-500 to-blue-600"
  };

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${colors[color]} rounded-2xl shadow-xl overflow-hidden cursor-pointer`}
      onClick={onClick}
    >
      <div className="p-8 text-white">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="opacity-90">{description}</p>
        <motion.div 
          className="w-8 h-1 bg-white mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default function Dashboards() {
  const navigate = useNavigate();

  // Protect dashboard using JWT
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT to check expiry
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        // Check token validity via API (optional for extra security)
        const res = await fetch("https://carrerchowk-backend.onrender.com/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Authentication error:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const cards = [
    {
      title: "Upload Document",
      description: "Upload and process new legal documents",
      color: "gray",
      icon: "📄",
      route: "/uploadDocument"
    },
    {
      title: "Manage Documents",
      description: "View, edit and organize your documents",
      color: "gray",
      icon: "🗂️",
      route: "/manageDocuments"
    },
    {
      title: "Upload Notice",
      description: "Create and publish new legal notices",
      color: "green",
      icon: "📢",
      route: "/uploadNotice"
    },
    
    {
      title: "Manage Notices",
      description: "Track and update your legal notices",
      color: "green",
      icon: "📋",
      route: "/manageNotices"
    },
    {
      title: "Upload PYQs",
      description: "Upload Previous Year Paper. ",
      color: "cyan",
      icon: "📋",
      route: "/UploadPYQs"
    },
    {
      title: "Manage PYQs",
      description: "View and Edit Previous Year Paper. ",
      color: "cyan",
      icon: "📋",
      route: "/ManagePYQs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardNavbar />

      <motion.div 
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Legal Management <span className="text-lime-700">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your legal document workflow with powerful tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              description={card.description}
              color={card.color}
              icon={card.icon}
              onClick={() => navigate(card.route)}
            />
          ))}
        </div>

        
      </motion.div>


    </div>
  );
}
