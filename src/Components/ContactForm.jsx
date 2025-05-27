import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // NEW: Added loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // NEW: Modified handleSubmit to connect with backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("https://carrerchowk-backend.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      // Reset form only after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // NEW: Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* NEW: Success/Error message display */}
      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          Message sent successfully! We'll contact you soon.
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error} Please try again later.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid gap-4">
        <div>
          <label className="block mb-1">Name*</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            // NEW: Disabled during loading
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block mb-1">Email*</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Message*</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows="4"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
          disabled={isLoading}
        ></textarea>
      </div>

      <button
        type="submit"
        className={`px-6 py-2 rounded-lg transition ${
          isLoading 
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-600 text-white hover:bg-gray-800"
        }`}
        disabled={isLoading}
      >
        {/* NEW: Loading indicator */}
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
};

export default ContactForm;