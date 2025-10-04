import React, { useContext } from 'react';
import { StatusContext } from '../../context/StatusContext';

const StatusTable = () => {
    const { statusData } = useContext(StatusContext);
    
    const totalItems = Object.values(statusData).reduce((acc, count) => acc + count, 0);
    
    return (
        <div className="table-responsive">
            <h2>Item Status Summary</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Count</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(statusData).map(([status, count]) => {
                        const percentage = totalItems > 0 ? ((count / totalItems) * 100).toFixed(2) : 0;
                        return (
                            <tr key={status}>
                                <td>{status}</td>
                                <td>{count}</td>
                                <td>{percentage}%</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StatusTable;