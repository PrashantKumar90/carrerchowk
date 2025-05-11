import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Account created successfully!');
    }, 1500);
  };

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
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col   ">
      {/* Floating bubbles background */}
      <Navbar />
      <div className="absolute inset-0 overflow-hidden ">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${10 + Math.random() * 50}px`,
              height: `${10 + Math.random() * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10  w-[25vw] items-center justify-center mx-auto my-16 "
      >
        <motion.div
          whileHover={{ y: -5 }}
          className=" backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Decorative gradient border */}
          <div className=" absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 pointer-events-none" />
          
          <div className="p-8">
            {/* Logo/Header */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="text-center mb-8"
            >
              <motion.div variants={item} className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </motion.div>
              <motion.h2 variants={item} className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                Join Career Chowk
              </motion.h2>
              <motion.p variants={item} className="text-white/70 mt-2">
                Create your account to get started
              </motion.p>
            </motion.div>

            {/* Form */}
            <motion.form 
              variants={container}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name Field */}
              <motion.div variants={item} className="relative">
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur text-white placeholder-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all"
                  placeholder="Full Name"
                />
                <label className="absolute left-4 -top-2.5 text-xs bg-gradient-to-r from-indigo-900/80 to-purple-900/80 px-1 text-white/80 pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white/80">
                  Full Name
                </label>
              </motion.div>

              {/* Email Field */}
              <motion.div variants={item} className="relative">
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur text-white placeholder-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                  placeholder="Email Address"
                />
                <label className="absolute left-4 -top-2.5 text-xs bg-gradient-to-r from-indigo-900/80 to-purple-900/80 px-1 text-white/80 pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white/80">
                  Email Address
                </label>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={item} className="relative">
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur text-white placeholder-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
                  placeholder="Password"
                />
                <label className="absolute left-4 -top-2.5 text-xs bg-gradient-to-r from-indigo-900/80 to-purple-900/80 px-1 text-white/80 pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white/80">
                  Password
                </label>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div variants={item} className="relative">
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur text-white placeholder-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all"
                  placeholder="Confirm Password"
                />
                <label className="absolute left-4 -top-2.5 text-xs bg-gradient-to-r from-indigo-900/80 to-purple-900/80 px-1 text-white/80 pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white/80">
                  Confirm Password
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={item} className="pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-pink-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  {isLoading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <span className="relative z-10">Create Account</span>
                  )}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={isLoading ? { scale: 10, opacity: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-white/20 rounded-full"
                  />
                </motion.button>
              </motion.div>
            </motion.form>

            {/* Login Link */}
            <motion.div 
              variants={item}
              className="mt-6 text-center text-sm text-white/70"
            >
              <p>
                Already have an account?{' '}
                <a href="#" className="text-white font-medium hover:underline underline-offset-4">
                  Sign in
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default SignupPage;