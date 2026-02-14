import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const statusColumns = ["Pending", "In Progress", "Delivered", "Cancelled"];

const OrderTimeline = () => {
  const [orders, setOrders] = useState({
    Pending: [],
    "In Progress": [],
    Delivered: [],
    Cancelled: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/orders`);
        const grouped = { Pending: [], "In Progress": [], Delivered: [], Cancelled: [] };
        res.data.forEach((o) => grouped[o.status].push(o));
        setOrders(grouped);
      } catch (err) {
        toast.error("Failed to load orders");
      }
    };
    fetchOrders();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus === destStatus) return; // no change

    const movedOrder = orders[sourceStatus][source.index];
    const newSourceOrders = Array.from(orders[sourceStatus]);
    newSourceOrders.splice(source.index, 1);

    const newDestOrders = Array.from(orders[destStatus]);
    newDestOrders.splice(destination.index, 0, movedOrder);

    setOrders({
      ...orders,
      [sourceStatus]: newSourceOrders,
      [destStatus]: newDestOrders,
    });

    try {
      await axios.put(`${API_URL}/orders/${movedOrder.id}`, { status: destStatus });
      toast.success(`Order status updated to ${destStatus}`);
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statusColumns.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-50 p-4 rounded-lg min-h-[300px] shadow-sm"
              >
                <h3 className="font-semibold mb-2">{status}</h3>
                {orders[status].map((order, index) => (
                  <Draggable key={order.id} draggableId={String(order.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 mb-2 rounded shadow hover:bg-gray-100"
                      >
                        <p className="font-medium">{order.productName}</p>
                        <p className="text-sm text-gray-500">{order.supplierName}</p>
                        <p className="text-sm text-gray-400">
                          Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default OrderTimeline;
