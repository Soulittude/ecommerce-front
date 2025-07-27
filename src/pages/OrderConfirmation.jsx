import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OrderConfirmation() {
  const { currentOrder } = useSelector((s) => s.order);

  if (!currentOrder) {
    return (
      <div className="p-4">
        <p>No order found.</p>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Thank you for your order!</h1>
      <p>
        Order ID: <strong>{currentOrder.id}</strong>
      </p>
      <p>Placed on: {new Date(currentOrder.createdAt).toLocaleString()}</p>
      <h2 className="text-xl font-semibold">Items</h2>
      <ul className="list-disc list-inside">
        {currentOrder.items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} - ₺{item.price}
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold">
        Total: ₺{currentOrder.totalAmount}
      </p>
      <Link to="/" className="inline-block mt-4 text-blue-600 hover:undeline">
        Continue Shopping
      </Link>
    </div>
  );
}
