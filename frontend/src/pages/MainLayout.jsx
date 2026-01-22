import { useState } from "react";
import Sidebar from "../pages/Sidebar";
import "../styles/MainLayout.css";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Desktop Sidebar */}
      <div className="desktop-sidebar">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="mobile-header">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <h4>Inventory</h4>
        </div>

        <div className="content-body">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
