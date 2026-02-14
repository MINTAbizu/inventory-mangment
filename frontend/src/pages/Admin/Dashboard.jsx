import React, { useState } from "react";
import SupplierTable from "../components/SupplierTable";
import SupplierModal from "../components/SupplierModal";
import OrderTimeline from "../components/OrderTimeline";
import AnalyticsChart from "../components/AnalyticsChart";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  return (
    <div className="p-4 space-y-6">
      <ToastContainer position="top-right" />
      
      {/* Analytics Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <AnalyticsChart />
      </div>

      {/* Supplier Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Suppliers</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => { setEditingSupplier(null); setModalOpen(true); }}
          >
            Add Supplier
          </button>
        </div>
        <SupplierTable
          onEdit={(supplier) => {
            setEditingSupplier(supplier);
            setModalOpen(true);
          }}
        />
      </div>

      {/* Orders Timeline */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Orders Timeline</h2>
        <OrderTimeline />
      </div>

      {/* Supplier Modal */}
      {modalOpen && (
        <SupplierModal
          supplier={editingSupplier}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
