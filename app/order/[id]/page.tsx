"use client"

import Footer from "@/app/ui/home/footer/footer";
import NavBar from "@/app/ui/home/navbar/mainnavbar";
import { OrderDocument } from "@/models/Order";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderDetails({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDocument | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/order/get/${params.id}`);
        setOrder(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch order');
      }
    };

    fetchOrder();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
          <NavBar />
    <div className=" bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h1>

      {/* Shipping Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <p><span className="font-semibold">Order Id:</span> T-{order.orderId}</p>
          <p><span className="font-semibold">Name:</span> {order.shippingData.name}</p>
          <p><span className="font-semibold">Email:</span> {order.shippingData.email}</p>
          <p><span className="font-semibold">Phone:</span> {order.shippingData.phoneCountryCode} {order.shippingData.phoneNumber}</p>
          <p><span className="font-semibold">Country:</span> {order.shippingData.country}</p>
          <p><span className="font-semibold">City:</span> {order.shippingData.city}</p>
          <p><span className="font-semibold">Address:</span> {order.shippingData.addressLine1} {order.shippingData.addressLine2}</p>
          <p><span className="font-semibold">Postcode:</span> {order.shippingData.postcode}</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ordered Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr className="text-left bg-gray-50 text-gray-600 font-medium">
                {/* <th className="px-4 py-2">Image</th> */}
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
  {order.cart.map((item, i) => (
    <tr key={i}>
      <td className="px-4 py-3">{item.name}</td>
      <td className="px-4 py-3">{item.size}</td>
      <td className="px-4 py-3">{item.quantity}</td>
      <td className="px-4 py-3">${item.price}</td>
      <td className="px-4 py-3 whitespace-pre-line text-xs text-gray-700">
        {item.measurements ? (
          <div className="space-y-1">
            <p><strong>Bust:</strong> {item.measurements.bust}</p>
            <p><strong>Waist:</strong> {item.measurements.waist}</p>
            <p><strong>Hips:</strong> {item.measurements.hips}</p>
            <p><strong>Shoulder:</strong> {item.measurements.shoulder}</p>
            <p><strong>Sleeve:</strong> {item.measurements.sleeveLength}</p>
            <p><strong>Length:</strong> {item.measurements.lengthFromShoulderToFloor}</p>
          </div>
        ) : (
          <span>No measurements</span>
        )}

        {item.additionalInstructions && (
          <div className="mt-2 text-gray-800">
            <strong>Instructions:</strong> {item.additionalInstructions}
          </div>
        )}
      </td>
      <td className="px-4 py-3 font-medium">${item.price * item.quantity}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
          <p><span className="font-semibold">Payment Status:</span>{" "}
            <span className={`font-medium ${order.paymentStatus === 'succeeded' ? 'text-green-600' : order.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
              {order.paymentStatus}
            </span>
          </p>
          <p><span className="font-semibold">Delivery Status:</span>{" "}
            <span className={`font-medium ${order.deliveryStatus === 'completed' ? 'text-green-600' : order.deliveryStatus === 'pending' ? 'text-yellow-600' : 'text-blue-600'}`}>
              {order.deliveryStatus}
            </span>
          </p>
          <p><span className="font-semibold">Total Amount:</span> ${order.totalAmount}</p>
          <p><span className="font-semibold">Ordered At:</span> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
