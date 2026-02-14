// context/AdminDataContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
    const [statusData, setStatusData] = useState({});
    const [salesData, setSalesData] = useState({});
    const [userStats, setUserStats] = useState({});

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [statusRes, salesRes, usersRes] = await Promise.all([
                    axios.get('/api/admin/status-summary'),
                    axios.get('/api/admin/sales-summary'),
                    axios.get('/api/admin/user-summary'),
                ]);

                setStatusData(statusRes.data);
                setSalesData(salesRes.data);
                setUserStats(usersRes.data);
            } catch (err) {
                console.error('Failed to fetch admin data', err);
            }
        };

        fetchAdminData();
    }, []);

    return (
        <AdminDataContext.Provider value={{ statusData, salesData, userStats }}>
            {children}
        </AdminDataContext.Provider>
    );
};
