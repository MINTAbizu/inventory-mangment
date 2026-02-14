import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Bar } from "react-chartjs-2";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

// TailwindCSS responsive table and card styles

const API_URL = import.meta.env.VITE_API_URL;

const SupplierManagement = () => {
  const queryClient = useQueryClient();

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch suppliers
  const { data: suppliers = [], isLoading } = useQuery(["suppliers"], async () => {
    const res = await axios.get(`${API_URL}/suppliers`);
    return res.data;
  });

  // Mutation for delete supplier
  const deleteSupplier = useMutation(
    async (id) => axios.delete(`${API_URL}/suppliers/${id}`),
    {
      onSuccess: () => {
        toast.success("Supplier deleted successfully!");
        queryClient.invalidateQueries(["suppliers"]);
      },
      onError: () => toast.error("Failed to delete supplier."),
    }
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      deleteSupplier.mutate(id);
    }
  };

  // Prepare chart data
  const chartData = {
    labels: suppliers.map((s) => s.name),
    datasets: [
      {
        label: "Pending Orders",
        data: suppliers.map((s) => s.pendingOrders),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
      {
        label: "Delivered Orders",
        data: suppliers.map((s) => s.deliveredOrders),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
      },
    ],
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-6">
      {/* Analytics */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Supplier Order Analytics</h2>
        <Bar data={chartData} />
      </div>

      {/* Supplier Table */}
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Supplier Management</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Pending Orders</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{supplier.name}</td>
                <td className="px-4 py-2">{supplier.email}</td>
                <td className="px-4 py-2">{supplier.contact}</td>
                <td className="px-4 py-2">{supplier.pendingOrders}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setSelectedSupplier(supplier);
                      setShowModal(true);
                    }}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(supplier.id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Supplier */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {selectedSupplier ? "Edit Supplier" : "Add Supplier"}
            </h3>
            {/* Form fields here */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;
