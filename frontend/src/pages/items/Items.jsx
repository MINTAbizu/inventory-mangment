import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { StatusContext } from '../../context/StatusContext';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import * as XLSX from "xlsx";

function Items() {
  const { setStatusData } = useContext(StatusContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          'https://inventory-mangment-6.onrender.com/api/items/getitem'
        );
        setItems(res.data);
        aggregateStatus(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const aggregateStatus = (data) => {
      const result = data.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {});
      setStatusData(result);
    };

    fetchItems();
  }, [setStatusData]);

  const exportToExcel = () => {
    const formatted = items.map(i => ({
      Name: i.name,
      Category: i.category,
      Unit: i.unit,
      Cost: i.cost,
      Quantity: i.quantity,
      Status: i.status
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Items");
    XLSX.writeFile(wb, "Inventory_Items.xlsx");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete item?")) return;
    await axios.delete(
      `https://inventory-mangment-6.onrender.com/api/items/${id}`
    );
    setItems(items.filter(i => i._id !== id));
  };

  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="card shadow-sm">

      {/* HEADER */}
      <div className="card-header d-flex flex-column flex-md-row justify-content-between gap-2">
        <h5 className="mb-0">Inventory Management</h5>

        <div className="d-flex gap-2">
          <Link to="/Additems">
            <button className="btn btn-primary btn-sm">+ Item</button>
          </Link>
          <button
            className="btn btn-success btn-sm"
            onClick={exportToExcel}
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-striped mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Cost</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.unit}</td>
                <td>{item.cost}</td>
                <td>{item.quantity}</td>
                <td>
                  <span className={`badge ${
                    item.status === 'In-stock' ? 'bg-success' :
                    item.status === 'Low-stock' ? 'bg-warning' : 'bg-danger'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="d-flex gap-1 flex-wrap">
                  <button className="btn btn-sm btn-primary">
                    <VisibilityIcon fontSize="small" />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-sm btn-warning">
                    <EditIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="card-footer d-flex justify-content-center gap-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          Previous
        </button>

        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Items;
