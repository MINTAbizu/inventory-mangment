import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

// -------------------------- Admin Inventory Page --------------------------
const AdminInventory = () => {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get('/api/admin/inventory-summary'); // replace with your API
        setInventory(res.data);
      } catch (err) {
        console.error('Failed to fetch inventory:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  if (loading || !inventory) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading Inventory...</p>;

  // -------------------------- Chart Data --------------------------
  const statusData = {
    labels: ['Approved', 'Pending', 'Rejected', 'Sold'],
    datasets: [
      {
        data: [inventory.approved, inventory.pending, inventory.rejected, inventory.sold],
        backgroundColor: ['#4dabf7', '#ff9f43', '#ff6b6b', '#1dd1a1'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const categoryData = {
    labels: Object.keys(inventory.categories),
    datasets: [
      {
        label: 'Products per Category',
        data: Object.values(inventory.categories),
        backgroundColor: [
          '#4dabf7',
          '#ff9f43',
          '#ff6b6b',
          '#1dd1a1',
          '#a55eea',
          '#f368e0',
        ],
      },
    ],
  };

  const salesTrendData = {
    labels: inventory.salesTrend.map((d) => d.date),
    datasets: [
      {
        label: 'Products Sold',
        data: inventory.salesTrend.map((d) => d.sold),
        borderColor: '#4dabf7',
        backgroundColor: 'rgba(77, 171, 247, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // -------------------------- Card Styles --------------------------
  const cardStyle = {
    flex: '1 1 220px',
    margin: '1rem',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    color: '#fff',
  };

  const cardColors = ['#4dabf7', '#1dd1a1', '#ff9f43', '#ff6b6b', '#a55eea'];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f5f7', minHeight: '100vh' }}>
      
      {/* ===================== Header ===================== */}
      <header style={{ padding: '1.5rem 2rem', background: '#222f3e', color: '#fff' }}>
        <h1 style={{ margin: 0 }}>Inventory Dashboard</h1>
        <p style={{ marginTop: '0.5rem', color: '#ccc' }}>Admin Panel | International Standard Dashboard</p>
      </header>

      {/* ===================== Functional Cards ===================== */}
      <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
        {[
          { label: 'Total Products', value: inventory.totalProducts },
          { label: 'Approved', value: inventory.approved },
          { label: 'Pending', value: inventory.pending },
          { label: 'Rejected', value: inventory.rejected },
          { label: 'Sold', value: inventory.sold },
        ].map((stat, index) => (
          <div key={index} style={{ ...cardStyle, background: cardColors[index % cardColors.length] }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{stat.label}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</p>
          </div>
        ))}
      </section>

      {/* ===================== Charts ===================== */}
      <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: '2rem 0' }}>
        <div style={{ flex: '1 1 400px', margin: '1rem', padding: '1rem', background: '#fff', borderRadius: '12px' }}>
          <h3>Status Distribution</h3>
          <Pie data={statusData} />
        </div>

        <div style={{ flex: '1 1 400px', margin: '1rem', padding: '1rem', background: '#fff', borderRadius: '12px' }}>
          <h3>Products per Category</h3>
          <Bar data={categoryData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        <div style={{ flex: '1 1 90%', margin: '1rem', padding: '1rem', background: '#fff', borderRadius: '12px' }}>
          <h3>Sales Trend (Last 30 Days)</h3>
          <Line data={salesTrendData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
      </section>

      {/* ===================== Top Sellers Table ===================== */}
      <section style={{ margin: '2rem', background: '#fff', padding: '1rem', borderRadius: '12px' }}>
        <h3>Top Sellers</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f2f6' }}>
            <tr>
              <th style={{ padding: '0.8rem', borderBottom: '1px solid #ddd' }}>Seller</th>
              <th style={{ padding: '0.8rem', borderBottom: '1px solid #ddd' }}>Products Sold</th>
              <th style={{ padding: '0.8rem', borderBottom: '1px solid #ddd' }}>Approved Products</th>
            </tr>
          </thead>
          <tbody>
            {inventory.topSellers.map((seller) => (
              <tr key={seller._id}>
                <td style={{ padding: '0.8rem', borderBottom: '1px solid #ddd' }}>{seller.name}</td>
                <td style={{ padding: '0.8rem', borderBottom: '1px solid #ddd' }}>{seller.sold}</td>
                <td style={{ padding: '0.8rem', borderBottom: '1px solid #ddd' }}>{seller.approved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminInventory;
