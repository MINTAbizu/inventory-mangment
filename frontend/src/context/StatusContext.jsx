import React, { createContext, useState } from 'react';

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
    const [statusData, setStatusData] = useState({});

    return (
        <StatusContext.Provider value={{ statusData, setStatusData }}>
            {children}
        </StatusContext.Provider>
    );
};