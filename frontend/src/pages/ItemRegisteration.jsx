
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './itemregistration.css'

const ItemRegisteration = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', category: '', unit: '', cost: '', quantity: '' });

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.get('https://inventory-mangment-6.onrender.com/api/items');
            setItems(response.data);
        };
        fetchItems();
    }, []);

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://inventory-mangment-6.onrender.com/api/items', newItem);
        setNewItem({ name: '', category: '', unit: '', cost: '', quantity: '' }); // Reset form
        // Fetch updated items
        const response = await axios.get('https://inventory-mangment-6.onrender.com/api/items');
        setItems(response.data);
    };

    return (
        <div className='itemscontainer '>
            <h1>Inventory Items</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={newItem.name} onChange={handleChange} placeholder="Item Name" required />
                <input name="category" value={newItem.category} onChange={handleChange} placeholder="Category" required />
                <input name="unit" value={newItem.unit} onChange={handleChange} placeholder="Unit" required />
                <input name="cost" type="number" value={newItem.cost} onChange={handleChange} placeholder="Cost" required />
                <input name="quantity" type="number" value={newItem.quantity} onChange={handleChange} placeholder="Quantity" required />
                <button type="submit">Add Item</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Unit</th>
                        <th>Cost</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.unit}</td>
                            <td>{item.cost}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemRegisteration;



