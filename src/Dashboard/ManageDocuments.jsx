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

  const courseOptions = ["All", ...Object.keys(courses)];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://carrerchowk-backend.onrender.com/api/manage",
          {
            courseName: selectedCourse,
            semester:
              selectedSemester === "All"
                ? "All"
                : Number(selectedSemester),
          }
        );
        setDocuments(Array.isArray(response.data) ? response.data : []);
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

  useEffect(() => {
    if (selectedCourse === "BE - Electrical Eng") {
      setAvailableSemesters(["All", ...courses[selectedCourse].map(String)]);
    } else {
      setAvailableSemesters(["All"]);
    }
    setSelectedSemester("All");
  }, [selectedCourse]);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <p>Loading documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
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
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <motion.tr
                      key={doc._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-600">
                        {doc.courseName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {doc.semester}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
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
                                setDocuments((prevDocs) =>
                                  prevDocs.filter((d) => d._id !== result.id)
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
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No documents available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </>
  );
}
