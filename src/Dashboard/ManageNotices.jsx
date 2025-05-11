import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiTrash2, FiEdit, FiBell, FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import DashboardNavbar from "../Components/DashNavbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

export default function ManageNotices({ setView }) {
  // Sample notices data
  const [notices, setNotices] = useState([
    { id: 1, title: "Exam Schedule Update", audience: "All Students", priority: "High", date: "2023-11-10", status: "Active" },
    { id: 2, title: "Library Closure", audience: "All", priority: "Normal", date: "2023-11-05", status: "Expired" },
    { id: 3, title: "Fee Submission Deadline", audience: "B.Tech Students", priority: "Urgent", date: "2023-10-28", status: "Active" },
    { id: 4, title: "Holiday Announcement", audience: "All", priority: "Low", date: "2023-10-15", status: "Expired" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter notices based on search
  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.audience.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const noticesPerPage = 5;
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * noticesPerPage,
    currentPage * noticesPerPage
  );

  // Delete notice
  const handleDelete = (id) => {
    setIsDeleting(true);
    setTimeout(() => {
      setNotices(notices.filter(notice => notice.id !== id));
      setIsDeleting(false);
      setSelectedNotice(null);
    }, 1000);
  };
  const navigate = useNavigate(); 
  // Priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Urgent": return "bg-purple-100 text-purple-800";
      case "Normal": return "bg-blue-100 text-blue-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Status badge color
  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  return (
    <>
    <DashboardNavbar/>

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FiBell className="text-blue-600" /> Manage Notices
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option>All Audiences</option>
            <option>All Students</option>
            <option>B.Tech</option>
            <option>BCA</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Expired</option>
          </select>
        </div>
      </motion.div>

      {/* Notices Table */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedNotices.length > 0 ? (
                paginatedNotices.map((notice) => (
                  <motion.tr
                    key={notice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{notice.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{notice.audience}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notice.priority)}`}>
                        {notice.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{notice.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(notice.status)}`}>
                        {notice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        >
                          <FiEye />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        >
                          <FiEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          onClick={() => setSelectedNotice(notice)}
                        >
                          <FiTrash2 />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No notices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              <FiChevronLeft /> Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-full ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Next <FiChevronRight />
            </button>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Notice</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete <span className="font-semibold">"{selectedNotice.title}"</span>? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedNotice.id)}
                  disabled={isDeleting}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isDeleting ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'} text-white transition-colors`}
                >
                  {isDeleting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block"
                      >
                        <FiTrash2 />
                      </motion.span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FiTrash2 /> Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    </>
  );
}