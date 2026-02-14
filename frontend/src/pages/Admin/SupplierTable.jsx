import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const SupplierTable = ({ onEdit }) => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: suppliers = [], isLoading } = useQuery(["suppliers"], async () => {
    const res = await axios.get(`${API_URL}/suppliers`);
    return res.data;
  });

  const deleteSupplier = useMutation(
    async (id) => axios.delete(`${API_URL}/suppliers/${id}`),
    {
      onSuccess: () => {
        toast.success("Supplier deleted!");
        queryClient.invalidateQueries(["suppliers"]);
      },
      onError: () => toast.error("Failed to delete supplier"),
    }
  );

  if (isLoading) return <div>Loading suppliers...</div>;

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search supplier..."
        className="mb-2 p-2 border rounded w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Contact</th>
            <th className="px-4 py-2 text-left">Pending Orders</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredSuppliers.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{s.name}</td>
              <td className="px-4 py-2">{s.email}</td>
              <td className="px-4 py-2">{s.contact}</td>
              <td className="px-4 py-2">{s.pendingOrders}</td>
              <td className="px-4 py-2 flex gap-2">
                <button className="text-blue-500" onClick={() => onEdit(s)}>
                  <AiFillEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => deleteSupplier.mutate(s.id)}
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;
