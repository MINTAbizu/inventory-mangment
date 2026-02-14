import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = import.meta.env.VITE_API_URL;

const AnalyticsChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get(`${API_URL}/suppliers`);
        const labels = res.data.map((s) => s.name);
        const pending = res.data.map((s) => s.pendingOrders);
        const delivered = res.data.map((s) => s.deliveredOrders || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Pending Orders",
              data: pending,
              backgroundColor: "rgba(59,130,246,0.7)",
            },
            {
              label: "Delivered Orders",
              data: delivered,
              backgroundColor: "rgba(16,185,129,0.7)",
            },
          ],
        });
      } catch (err) {
        toast.error("Failed to load analytics");
      }
    };
    fetchSuppliers();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Supplier Order Analytics</h2>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default AnalyticsChart;
