import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiFile, FiChevronLeft } from "react-icons/fi";
import DashboardNavbar from "../Components/DashNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageDocuments() {
  // Available courses and their respective semesters
  const courses = {
    "B.Tech": [1, 2, 3, 4, 5, 6, 7, 8],
    BCA: [1, 2, 3, 4, 5, 6],
    BBA: [1, 2, 3, 4, 5, 6],
    MBA: [1, 2, 3, 4],
  };

  // State management
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [availableSemesters, setAvailableSemesters] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1); // Added pagination state

  // Get course options
  const courseOptions = ["All", ...Object.keys(courses)];

  // Fetch documents from database with POST request
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("https://carrerchowk-backend.onrender.com/api/manage", {
          courseName: selectedCourse,
          semester: selectedSemester,
        });

        // Log the response data for debugging
        console.log("Response data:", response.data);

        // Check if response.data is an array
        const receivedData = Array.isArray(response.data) ? response.data : [];

        setDocuments(receivedData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch documents:", err);

        // Log error response for debugging
        if (err.response) {
          console.log("Error response:", err.response.data);
        }

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
  }, [selectedCourse, selectedSemester]); // Trigger fetching when course or semester changes

  // Update available semesters when course changes
  useEffect(() => {
    if (selectedCourse === "All") {
      setAvailableSemesters(["All"]);
      setSelectedSemester("All");
    } else {
      const semestersForCourse = [
        "All",
        ...courses[selectedCourse].map((s) => s.toString()),
      ];
      setAvailableSemesters(semestersForCourse);
      setSelectedSemester("All");
    }
  }, [selectedCourse]);

  // Pagination
  const docsPerPage = 5;
  const totalPages = Math.ceil(documents.length / docsPerPage);
  const paginatedDocs = documents.slice(
    (currentPage - 1) * docsPerPage,
    currentPage * docsPerPage
  );

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p>Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FiChevronLeft /> Back to Dashboard
          </button>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Course Filter */}
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none transition-all"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {/* Semester Filter */}
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none transition-all"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              disabled={selectedCourse === "All"}
            >
              {availableSemesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          onClick={async () => {
                            console.log("Delete button clicked"); // Check if this logs
                            try {
                              const response = await fetch(
                                "https://carrerchowk-backend.onrender.com/api/manage/delete",
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
                                // Remove the deleted document from the UI state
                                setDocuments((prevDocs) =>
                                  prevDocs.filter((d) => d._id !== result.id)
                                );
                                console.log("Document deleted successfully");
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
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
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
