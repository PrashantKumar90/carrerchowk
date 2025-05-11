import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const socialLinks = [
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "LinkedIn", icon: "💼", url: "#" },
    { name: "Instagram", icon: "📷", url: "#" },
    { name: "Facebook", icon: "👍", url: "#" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const contactInfo = [
    { icon: "✉️", text: "sahroshan221@gmail.com" },
    { icon: "📞", text: "+977 9864215329" },
    { icon: "🏢", text: "Nepal Polytechnic Institute, Mahendra Highway, Bharatpur 44207, Nepal" }
  ];

  return (
    <motion.footer 
      initial="hidden"
      whileInView="show"
      variants={container}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-700 to-gray-800 text-white py-12 mt-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
              CAREER-CHOWK
            </h2>
            <p className="text-blue-100">
              Your one-stop platform for quality educational resources and study materials.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4"
            >
              <button className="bg-white text-blue-900 px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                Join Community
              </button>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-blue-100 hover:text-white transition-colors flex items-center"
                  >
                    <span className="mr-2">→</span> {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={item}>
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <span className="text-xl mr-3">{info.icon}</span>
                  <span className="text-blue-100">{info.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
         
        </div>

        {/* Copyright */}
        <motion.div 
          variants={item}
          className="mt-12 pt-6 border-t border-blue-800 text-center text-blue-300"
        >
          <p>© {new Date().getFullYear()} CAREER-CHOWK. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-sm hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-white transition">Terms of Service</a>
            <a href="#" className="text-sm hover:text-white transition">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;