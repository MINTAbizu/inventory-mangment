import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import Sidebar from '../Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './items.css';
import { StatusContext } from '../../context/StatusContext';
import { Link } from 'react-router-dom';
import { ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import View Icon

function Items() {
    const { setStatusData } = useContext(StatusContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://inventory-mangment-6.onrender.com/api/items/getitem');
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

    const handleDelete = async (itemId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://inventory-mangment-6.onrender.com/api/items/${itemId}`);
                setItems(items.filter(item => item._id !== itemId));
                alert('Item deleted successfully');
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Failed to delete the item');
            }
        }
    };

    const handleView = (itemId) => {
        // Handle view action here, e.g., navigate to a detailed view
        console.log('View item with ID:', itemId);
        // You can redirect or show a modal, etc.
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="item-categories">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h1>Inventory Management</h1>
                            <Link to={'/Additems'}>
                                <button className="btn btn-primary">+ Item</button>
                            </Link>
                        </div>

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
                                    {currentItems.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.unit}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.status}</td>
                                            <td className='action'>
                                                <button className="btn btn-primary" onClick={() => handleView(item._id)}>
                                                    <VisibilityIcon /> View
                                                </button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                                <ListItemIcon>
                                                    <EditIcon />
                                                </ListItemIcon>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination mt-3">
                            <button onClick={prevPage} disabled={currentPage === 1} className="btn btn-secondary">Previous</button>
                            <span className="mx-2">Page {currentPage} of {totalPages}</span>
                            <button onClick={nextPage} disabled={currentPage === totalPages} className="btn btn-secondary">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Items;