import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register Chart.js components

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSale, setNewSale] = useState({ item: '', quantity: '', price: '' });
    const [salesData, setSalesData] = useState({}); // For chart data

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/sales'); // Adjust the endpoint as needed
                setSales(response.data);
                prepareChartData(response.data); // Prepare data for the chart
            } catch (error) {
                console.error('Error fetching sales:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    const prepareChartData = (sales) => {
        const labels = [];
        const data = [];
        
        sales.forEach(sale => {
            const date = new Date(sale.date).toLocaleDateString();
            const index = labels.indexOf(date);
            if (index === -1) {
                labels.push(date);
                data.push(sale.price * sale.quantity); // Calculate total sales for that date
            } else {
                data[index] += sale.price * sale.quantity; // Accumulate sales
            }
        });

        setSalesData({
            labels: labels,
            datasets: [
                {
                    label: 'Sales Revenue',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSale({ ...newSale, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/sales', newSale);
            setSales([...sales, response.data]); // Update sales state
            prepareChartData([...sales, response.data]); // Update chart data
            setNewSale({ item: '', quantity: '', price: '' }); // Reset form
        } catch (error) {
            console.error('Error adding sale:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ padding: 2 }}>
            <h1>Sales Management</h1>

            <form onSubmit={handleSubmit}>
                <TextField
                    name="item"
                    label="Item"
                    value={newSale.item}
                    onChange={handleChange}
                    required
                    sx={{ marginRight: 1 }}
                />
                <TextField
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={newSale.quantity}
                    onChange={handleChange}
                    required
                    sx={{ marginRight: 1 }}
                />
                <TextField
                    name="price"
                    label="Price"
                    type="number"
                    value={newSale.price}
                    onChange={handleChange}
                    required
                    sx={{ marginRight: 1 }}
                />
                <Button type="submit" variant="contained">Add Sale</Button>
            </form>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale._id}>
                                <TableCell>{sale.item}</TableCell>
                                <TableCell>{sale.quantity}</TableCell>
                                <TableCell>{sale.price}</TableCell>
                                <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h2>Sales Analysis</h2>
            <Bar
                data={salesData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
                style={{ marginTop: 20, height: '400px' }}
            />
        </Box>
    );
};

export default Sales;