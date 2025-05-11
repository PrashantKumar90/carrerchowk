import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiArrowLeft, FiAlertTriangle, FiCheck, FiX } from "react-icons/fi";
import DashboardNavbar from "../Components/DashNavbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

export default function UploadNotice({ setView }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "normal"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
    <DashboardNavbar/>
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3"
          >
            <FiCheck className="text-xl" />
            <span>Notice published successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          whileHover={{ y: -5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <motion.button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition-all"
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowLeft /> Back
              </motion.button>
              
              <div className="flex items-center gap-3">
                <FiAlertTriangle className="text-2xl" />
                <h1 className="text-2xl font-bold">New Notice</h1>
              </div>
              
              <div className="w-8"></div> {/* Spacer */}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Notice Title*</label>
              <input
                type="text"
                required
                placeholder="Enter notice title"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="low">Low Priority</option>
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Notice Content*</label>
              <textarea
                required
                placeholder="Type your notice content here..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all min-h-[150px]"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">Attachment (Optional)</label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 hover:border-green-400 rounded-xl p-6 text-center transition-all flex flex-col items-center justify-center gap-2">
                    <FiUpload className="text-2xl text-green-500" />
                    <p className="text-gray-600">
                      {file ? file.name : "Click to upload or drag & drop"}
                    </p>
                    <p className="text-sm text-gray-400">PDF, DOCX (Max 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                
                {file && (
                  <motion.button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-red-500 hover:text-red-700 p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX className="text-xl" />
                  </motion.button>
                )}
              </div>
            </motion.div>

            <motion.div
              className="flex justify-end gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="button"
                onClick={() => setView("dashboard")}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium flex items-center gap-2 ${
                  isSubmitting
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white transition-colors`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FiUpload />
                    </motion.span>
                    Publishing...
                  </>
                ) : (
                  <>
                    <FiUpload />
                    Publish Notice
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>

    </>
  );
}