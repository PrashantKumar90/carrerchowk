// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import Dashboards from "./Dashboard/Dashboards";
import UploadDocument from "./Dashboard/UploadDocument";
import UploadNotice from "./Dashboard/UploadNotice";
import ManageDocuments from "./Dashboard/ManageDocuments";
import ManageNotices from "./Dashboard/ManageNotices";
import UploadPYQ from "./Dashboard/UploadPYQ";
import ManagePYQs from "./Dashboard/ManagePYQs"
import PrivateRoute from "./utils/PrivateRoute";  // Import PrivateRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignupPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={<PrivateRoute><Dashboards /></PrivateRoute>} 
        />
        <Route 
          path="/uploadDocument" 
          element={<PrivateRoute><UploadDocument /></PrivateRoute>} 
        />
        <Route 
          path="/uploadNotice" 
          element={<PrivateRoute><UploadNotice /></PrivateRoute>} 
        />
        <Route 
          path="/manageDocuments" 
          element={<PrivateRoute><ManageDocuments /></PrivateRoute>} 
        />
        <Route 
          path="/manageNotices" 
          element={<PrivateRoute><ManageNotices /></PrivateRoute>} 
        />
        <Route 
          path="/UploadPYQs" 
          element={<PrivateRoute><UploadPYQ /></PrivateRoute>} 
        /> 
        <Route
        path="/ManagePYQs"
        element={<PrivateRoute><ManagePYQs/></PrivateRoute>}
></Route>
      </Routes>
    </Router>
  );
}

export default App;
