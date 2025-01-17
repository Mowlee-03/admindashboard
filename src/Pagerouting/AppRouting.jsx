import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar';
import Dashboard from '../Components/Dashboard';
import PostProperty from '../Components/PostProperty';
import ViewPost from '../Components/ViewPost';
import Users from '../Components/Users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PropertyList from '../Components/PropertyList';


const AppRouting = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div className={`lg:ml-64 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/posts" element={<PostProperty />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<ViewPost />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </>
  )
}

export default AppRouting