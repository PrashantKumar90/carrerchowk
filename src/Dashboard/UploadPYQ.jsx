import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiBook, FiLayers, FiLink, FiUpload, FiFileText } from "react-icons/fi";
import DashboardNavbar from "../Components/DashNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadPYQ() {
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [url, setUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async () => {
    if (!course || !semester || !subject || !url) {
      showNotification("error", "Please fill all fields");
      return;
    }

    try {
      setIsUploading(true);
      const response = await axios.post(
        "http://localhost:5000/api/uploadpyq/",
        {
          courseName: course,
          semester,
          subjectName: subject,
          fileUrl: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        showNotification("success", "PYQ uploaded successfully!");
        setCourse("");
        setSemester("");
        setSubject("");
        setUrl("");
      }
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      showNotification(
        "error",
        error.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const courses = {
    "B.Tech": [1, 2, 3, 4, 5, 6, 7, 8],
    BCA: [1, 2, 3, 4, 5, 6],
    BBA: [1, 2, 3, 4, 5, 6],
    MBA: [1, 2, 3, 4],
  };

  return (
    <>
      <DashboardNavbar />
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {notification && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <div className="flex items-center">
              <FiFileText className="mr-2" />
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}

        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <motion.button
                onClick={() => navigate("/dashboard")}
                className="flex items-center text-gray-500 hover:text-blue-400"
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowLeft className="mr-2" /> Back
              </motion.button>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FiFileText className="mr-2 text-gray-900" /> Upload PYQ
              </h2>
              <div className="w-8" />
            </div>

            {/* Course Selection */}
            <div className="relative">
              <FiBook className="absolute left-3 top-3 text-gray-400" />
              <select
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  setSemester("");
                }}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-500"
                required
              >
                <option value="">Select Course</option>
                {Object.keys(courses).map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester Selection */}
            <div className="relative">
              <FiLayers className="absolute left-3 top-3 text-gray-400" />
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                disabled={!course}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-500 disabled:opacity-50"
                required
              >
                <option value="">Select Semester</option>
                {course &&
                  courses[course].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
              </select>
            </div>

            {/* Subject Input */}
            <div className="relative">
              <FiFileText className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-500"
                required
              />
            </div>

            {/* URL Input */}
            <div className="relative">
              <FiLink className="absolute left-3 top-3 text-gray-400" />
              <input
                type="url"
                placeholder="Enter Google Drive URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-500"
                required
              />
            </div>

            {/* Upload Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={isUploading}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                isUploading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-500"
              } text-white transition-colors`}
              whileTap={{ scale: isUploading ? 1 : 0.98 }}
            >
              <FiUpload className="mr-2" />
              {isUploading ? "Uploading..." : "Upload PYQ"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
