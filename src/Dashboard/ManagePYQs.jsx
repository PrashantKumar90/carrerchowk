import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiFile, FiChevronLeft } from "react-icons/fi";
import DashboardNavbar from "../Components/DashNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageDocuments() {
  const courses = {
    "BE - Electrical Eng": [1, 2, 3, 4, 5, 6, 7, 8],
    NEC: [1],
    NEA: [1],
    PSC: [1],
  };

  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [availableSemesters, setAvailableSemesters] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);

  const courseOptions = ["All", ...Object.keys(courses)];
  const navigate = useNavigate();

  // Fetch documents from backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://carrerchowk-backend.onrender.com/api/managepyq",
          {
            courseName: selectedCourse,
            semester: selectedSemester,
          }
        );

        const receivedData = Array.isArray(response.data) ? response.data : [];
        setDocuments(receivedData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch documents"
        );
        setDocuments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [selectedCourse, selectedSemester]);

  // Update semester options
  useEffect(() => {
    if (selectedCourse === "All") {
      setAvailableSemesters(["All"]);
      setSelectedSemester("All");
    } else if (selectedCourse === "BE - Electrical Eng") {
      const semesters = ["All", ...courses[selectedCourse].map((s) => s.toString())];
      setAvailableSemesters(semesters);
      setSelectedSemester("All");
    } else {
      setAvailableSemesters([]); // Hide semester dropdown for other courses
      setSelectedSemester("All");
    }
  }, [selectedCourse]);

  const docsPerPage = 5;
  const totalPages = Math.ceil(documents.length / docsPerPage);
  const paginatedDocs = documents.slice(
    (currentPage - 1) * docsPerPage,
    currentPage * docsPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p>Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FiFile className="text-blue-600" /> Manage Documents
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <FiChevronLeft /> Back to Dashboard
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Course Filter */}
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            {/* Semester Filter - only show if BE selected */}
            {selectedCourse === "BE - Electrical Eng" && (
              <select
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {availableSemesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            )}
          </div>
        </motion.div>

        {/* Documents Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedDocs.length > 0 ? (
                  paginatedDocs.map((doc) => (
                    <motion.tr
                      key={doc._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {doc.courseName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {doc.semester}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {doc.subjectName}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          onClick={async () => {
                            try {
                              const response = await fetch(
                                "https://carrerchowk-backend.onrender.com/api/managepyq/delete",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({ id: doc._id }),
                                }
                              );
                              const result = await response.json();
                              if (result.success) {
                                setDocuments((prev) =>
                                  prev.filter((d) => d._id !== result.id)
                                );
                              } else {
                                console.error("Failed to delete document");
                              }
                            } catch (error) {
                              console.error("Deletion failed:", error);
                            }
                          }}
                        >
                          Delete
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No documents available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
