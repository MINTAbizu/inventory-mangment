import { useState } from 'react';
import Sidebar from '../pages/Sidebar';
import '../pages/Sidebar.css';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* DESKTOP SIDEBAR */}
        <div className="d-none d-md-block col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* MOBILE DRAWER SIDEBAR */}
        <div className={`d-md-none sidebar ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="col-12 col-md-9 col-lg-10">

          {/* MOBILE HEADER */}
          <div className="d-md-none sticky-top bg-white border-bottom p-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
          </div>

          <div className="p-3">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainLayout;
