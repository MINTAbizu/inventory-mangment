import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const SupplierModal = ({ supplier, onClose }) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    pendingOrders: 0,
  });

  useEffect(() => {
    if (supplier) setForm(supplier);
  }, [supplier]);

  const saveSupplier = useMutation(
    async () => {
      if (supplier) {
        return axios.put(`${API_URL}/suppliers/${supplier.id}`, form);
      } else {
        return axios.post(`${API_URL}/suppliers`, form);
      }
    },
    {
      onSuccess: () => {
        toast.success("Supplier saved!");
        queryClient.invalidateQueries(["suppliers"]);
        onClose();
      },
      onError: () => toast.error("Failed to save supplier"),
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSupplier.mutate();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">{supplier ? "Edit Supplier" : "Add Supplier"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded border"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierModal;
