import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = ({ onItemAdded }) => {
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        unit: '',
        cost: '',
        quantity: '',
        status: 'In-stock', // Default status
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/items/postitem', newItem);
            // onItemAdded(response.data); // Notify parent component
            setNewItem({ name: '', category: '', unit: '', cost: '', quantity: '', status: 'In-stock' });
            alert('Item added successfully');
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="row g-3 p-4 border rounded bg-light" style={{ maxWidth: '600px', margin: 'auto' }}>
            <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={newItem.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" name="category" value={newItem.category} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
                <label htmlFor="unit" className="form-label">Unit</label>
                <input type="text" className="form-control" id="unit" name="unit" value={newItem.unit} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
                <label htmlFor="cost" className="form-label">Cost</label>
                <input type="number" className="form-control" id="cost" name="cost" value={newItem.cost} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input type="number" className="form-control" id="quantity" name="quantity" value={newItem.quantity} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
                <label htmlFor="status" className="form-label">Status</label>
                <select className="form-select" id="status" name="status" value={newItem.status} onChange={handleChange}>
                    <option value="In-stock">In-stock</option>
                    <option value="Out-stock">Out-stock</option>
                    <option value="Low-stock">Low-stock</option>
                </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">Add Item</button>
            </div>
        </form>
    );
};

export default AddItemForm;