import { useState } from 'react';
import Sidebar from '../pages/Sidebar';
import '../pages/Sidebar.css';

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row g-0">

                {/* MOBILE OVERLAY */}
                {sidebarOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* SIDEBAR */}
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
                    <div className="d-md-none p-2 border-bottom bg-white sticky-top">
                        <button
                            className="btn btn-outline-primary"
                            onClick={toggleSidebar}
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
