import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Resources", path: "/resources" },
    // { name: "Dashboard", path: "/dashboard" },
    { name: "Contact", path: "/contact" },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: -20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const mobileMenu = {
    hidden: { y: -50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200
      }
    },
    exit: { y: -50, opacity: 0 }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gradient-to-r from-gray-800 to-gray-800 text-white shadow-xl sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
                CAREER-CHOWK
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center space-x-8"
          >
            {navLinks.map((link, index) => (
              <motion.div key={index} variants={item}>
                <Link 
                  to={link.path}
                  className="relative group px-2 py-1"
                >
                  <span className="text-white hover:text-blue-200 transition-colors">
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}

            <motion.div variants={item}>
              <Link
                to="/login"
                className="relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white transform group-hover:scale-110 transition-transform duration-300 rounded-full"></span>
                <span className="relative z-10 block px-7 py-2 text-gray-900 font-medium group-hover:text-gray-800 transition-colors">
                  Login
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-8 space-y-1.5">
              <motion.span 
                animate={isMenuOpen ? { rotate: 45, y: 7 } : {}}
                className="block h-1 bg-white rounded-full"
              ></motion.span>
              <motion.span 
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-1 bg-white rounded-full"
              ></motion.span>
              <motion.span 
                animate={isMenuOpen ? { rotate: -45, y: -7 } : {}}
                className="block h-1 bg-white rounded-full"
              ></motion.span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenu}
              initial="hidden"
              animate="show"
              exit="exit"
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mt-2"
                >
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2  bg-white text-gray-900 font-medium rounded-lg text-center hover:bg-blue-100 transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;