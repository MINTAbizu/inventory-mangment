import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
// import Sidebar from '../Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './items.css';
import { StatusContext } from '../../context/StatusContext';
import { Link } from 'react-router-dom';
import { ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as XLSX from "xlsx";

function Items() {
    const { setStatusData } = useContext(StatusContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(
                    'https://inventory-mangment-6.onrender.com/api/items/getitem'
                );
                setItems(response.data);
                aggregateStatus(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        const aggregateStatus = (items) => {
            const statusCounts = items.reduce((acc, item) => {
                const normalizedStatus = normalizeStatus(item.status);
                acc[normalizedStatus] = (acc[normalizedStatus] || 0) + 1;
                return acc;
            }, {});
            setStatusData(statusCounts);
        };

        const normalizeStatus = (status) => {
            switch (status) {
                case 'Out-stock':
                    return 'Out of Stock';
                case 'Low-stock':
                    return 'Low Stock';
                case 'In-stock':
                    return 'In Stock';
                default:
                    return status;
            }
        };

        fetchItems();
    }, [setStatusData]);

    // ✅ EXPORT TO EXCEL
    const exportToExcel = () => {
        const formattedData = items.map(item => ({
            Name: item.name,
            Category: item.category,
            Unit: item.unit,
            Cost: item.cost,
            Quantity: item.quantity,
            Status: item.status
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
        XLSX.writeFile(workbook, "Inventory_Items.xlsx");
    };

    // ✅ DELETE ITEM
    const handleDelete = async (itemId) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            await axios.delete(
                `https://inventory-mangment-6.onrender.com/api/items/${itemId}`
            );
            setItems(items.filter(item => item._id !== itemId));
        } catch (error) {
            alert('Failed to delete item');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-50">
                <div className="spinner-border text-primary" />
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* SIDEBAR */}
                <div className="col-12 col-md-3 mb-3 mb-md-0">
                    {/* <Sidebar /> */}
                </div>

                {/* MAIN CONTENT */}
                <div className="col-12 col-md-9">
                    <div className="item-categories">

                        {/* HEADER */}
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
                            <h2 className="text-center text-md-start">
                                Inventory Management
                            </h2>

                            <div className="d-flex flex-column flex-sm-row gap-2">
                                <Link to="/Additems">
                                    <button className="btn btn-primary w-100">
                                        + Item
                                    </button>
                                </Link>

                                <button
                                    className="btn btn-success w-100"
                                    onClick={exportToExcel}
                                >
                                    Export to Excel
                                </button>
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Unit</th>
                                        <th>Cost</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(item => (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.unit}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.status}</td>
                                            <td className="d-flex flex-wrap gap-1">
                                                <button className="btn btn-sm btn-primary">
                                                    <VisibilityIcon fontSize="small" />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    Delete
                                                </button>

                                                <button className="btn btn-sm btn-warning">
                                                    <EditIcon fontSize="small" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}
                        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2 mt-3">
                            <button
                                className="btn btn-secondary"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>

                            <span>
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                className="btn btn-secondary"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Items;
