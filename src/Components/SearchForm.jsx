import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    course: "",
    semester: "",
    year: "",
    query: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <label htmlFor="course" className="sr-only">Select Course</label>
      <select
        id="course"
        name="course"
        value={formData.course}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
        required
      >
        <option value="">Select Course</option>
        <option value="Computer Science">Computer Science</option>
        <option value="IT">IT</option>
        <option value="Mechanical">Mechanical</option>
      </select>
    </div>

    <div>
      <label htmlFor="semester" className="sr-only">Select Semester</label>
      <select
        id="semester"
        name="semester"
        value={formData.semester}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
        required
      >
        <option value="">Select Semester</option>
        <option value="3rd">3rd</option>
        <option value="4th">4th</option>
        <option value="5th">5th</option>
      </select>
    </div>

    <div className="flex justify-end">
    <button
      type="submit"
      className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
    >
      Search
    </button>
  </div>
  </div>

 
</form>
  );
};

export default SearchForm;