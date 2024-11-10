// src/components/Orders.js
import React, { useEffect, useState } from 'react';
import { ref, get, child } from 'firebase/database';
import database from '../firebase';
import './Orders.css'; // Add a CSS file for styling

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'orders'));

        if (snapshot.exists()) {
          const ordersData = snapshot.val();
          const ordersList = Object.keys(ordersData).map(key => ({
            id: key,
            ...ordersData[key],
          }));
          setOrders(ordersList);
        } else {
          setError("No orders found.");
        }
      } catch (err) {
        setError("Failed to load orders.");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.itemName || 'N/A'}</td>
                <td>{order.quantity || 'N/A'}</td>
                <td>{order.status || 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
