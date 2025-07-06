import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FiEye, FiBook, FiLayers, FiArrowLeft, FiFile } from "react-icons/fi";

const Resources = () => {
  const courses = {
    "BE - Electrical Eng": [1, 2, 3, 4, 5, 6, 7, 8],
    NEC: [1],
    PSC: [1],
    NEA: [1],
  };

  const [searchData, setSearchData] = useState({ query: "", course: "", semester: "" });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  const [pyqSearchData, setPyqSearchData] = useState({ course: "", semester: "" });
  const [pyqResults, setPyqResults] = useState([]);
  const [isSearchingPYQ, setIsSearchingPYQ] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        await axios.get("https://carrerchowk-backend.onrender.com/api/documents");
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);
    try {
      const response = await axios.get("https://carrerchowk-backend.onrender.com/api/documents", {
        params: { query: searchData.query, course: searchData.course, semester: searchData.semester },
      });
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePyqInputChange = (e) => {
    const { name, value } = e.target;
    setPyqSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePYQSearch = async (e) => {
    e.preventDefault();
    setIsSearchingPYQ(true);
    try {
      const response = await axios.get("https://carrerchowk-backend.onrender.com/api/user-pyq", {
        params: { course: pyqSearchData.course, semester: pyqSearchData.semester, type: "PYQ" },
      });
      setPyqResults(response.data || []);
    } catch (error) {
      console.error("PYQ Search Error:", error);
    } finally {
      setIsSearchingPYQ(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      <motion.main initial="hidden" animate="show" variants={container} className="flex-grow container mx-auto px-4 py-12">
        <motion.div variants={item} className="flex items-center justify-between mb-8">
          <motion.button onClick={() => window.history.back()} className="flex items-center text-gray-500 hover:text-blue-600" whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
            <FiArrowLeft className="mr-2" /> Back
          </motion.button>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiFile className="mr-2 text-gray-800" /> Study Resources
          </h1>
          <div className="w-8" />
        </motion.div>

        {/* General Search Form */}
        <motion.div variants={item} className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Search Notes</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FiBook className="absolute left-3 top-3 text-gray-400" />
                <select name="course" value={searchData.course} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border rounded-lg">
                  <option value="">All Courses</option>
                  {Object.keys(courses).map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              {searchData.course === "BE - Electrical Eng" && (
                <div className="relative">
                  <FiLayers className="absolute left-3 top-3 text-gray-400" />
                  <select name="semester" value={searchData.semester} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border rounded-lg">
                    <option value="">All Semesters</option>
                    {courses[searchData.course].map((sem) => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <motion.button type="submit" disabled={isSearching} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {isSearching ? "Searching..." : "Search"}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Search Results */}
        {hasSearched && (
          <motion.div variants={item}>
            {isLoading ? (
              <div className="flex justify-center py-20">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full" />
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Found {searchResults.length} resources
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((doc) => (
                    <motion.div key={doc._id} variants={item} whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-md overflow-hidden border">
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{doc.subjectName}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">{doc.courseName}</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Sem {doc.semester}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <motion.a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center" whileHover={{ scale: 1.05 }}>
                            <FiEye className="mr-1" /> View
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No resources found</h3>
                <p className="text-gray-500">Try different search criteria</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Footer */}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Resources;
