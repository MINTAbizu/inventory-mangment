import React from 'react';
import StatusGraph from '../items/StatusGraph '; // Import StatusGraph
import StatusTable from '../items/StatusTabel'; // Import StatusTable
import { StatusContext } from '../../context/StatusContext'; // Import StatusContext
import { useContext } from 'react';

const StatusPage = () => {
    const { statusData } = useContext(StatusContext); // Consume the context

    return (
        <div className="container " style={{background:'white' ,height:'690px',color:'orange' }}>
            <h1>Item Status Overview</h1>
            <StatusGraph /> {/* Render the StatusGraph component */}
            <StatusTable /> {/* Render the StatusTable component */}
        </div>
    );
};

export default StatusPage;