'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { OrderDocument } from '@/models/Order';



export default function Category() {
    const [orders, setOrders] = useState<OrderDocument[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/order/get');
                setOrders(res.data.orders);
                console.log(res.data)
            } catch (err: any) {
                console.log(err)
                setError(err.response?.data?.message || 'Failed to fetch orders');
            }
        };

        fetchCategories();
    }, []);



    const handlePaymentStatusChange = async (orderId:string, newStatus:string) => {
        try {
          const res = await fetch(`/api/order/update/${orderId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentStatus: newStatus }),
          });

          if (res.ok) {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                  order._id === orderId
                    ? { ...(order.toObject ? order.toObject() : order), paymentStatus: newStatus } as OrderDocument
                    : order
                )
              );
          }
          // Refresh or update UI state here
        } catch (error) {
          toast.error("Error updating payment status");
        }
      };
      
      const handleDeliveryStatusChange = async (orderId:string, newStatus:string) => {
        try {
          const res = await fetch(`/api/order/update/${orderId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deliveryStatus: newStatus }),
          });

          if (res.ok) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? { ...(order.toObject ? order.toObject() : order), deliveryStatus: newStatus } as OrderDocument
                : order
            )
          );
        }
          // Refresh or update UI state here
        } catch (error) {
          toast.error("Error updating delivery status");
        }
      };




    return (
        <>
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[26px] font-bold">Orders</h2>
                    {/* <Link href="/admin/product/add">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded text-[14px]">
                            Add
                        </button>
                    </Link> */}
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Amount</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Payment</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Delivery</th>
                                            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {orders.map((order: OrderDocument, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">T-{order.orderId}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.shippingData.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.shippingData.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.shippingData.phoneNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.totalAmount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <select
                                                        value={order.paymentStatus}
                                                        onChange={(e) => handlePaymentStatusChange(order._id, e.target.value)}
                                                        className={`border text-sm rounded-md p-1 focus:outline-none
      ${order.paymentStatus === 'succeeded' ? 'bg-green-100 text-green-700 border-green-300' : ''}
      ${order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : ''}
      ${order.paymentStatus === 'failed' ? 'bg-red-100 text-red-700 border-red-300' : ''}`
                                                        }
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="succeeded">Succeeded</option>
                                                        <option value="failed">Failed</option>
                                                    </select>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <select
                                                        value={order.deliveryStatus}
                                                        onChange={(e) => handleDeliveryStatusChange(order._id, e.target.value)}
                                                        className={`border text-sm rounded-md p-1 focus:outline-none
      ${order.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-700 border-green-300' : ''}
      ${order.deliveryStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : ''}
      ${order.deliveryStatus === 'accepted' ? 'bg-gray-100 text-gray-700 border-gray-300' : ''}
      ${order.deliveryStatus === 'in-process' ? 'bg-orange-100 text-orange-700 border-orange-300' : ''}
      ${order.deliveryStatus === 'dispatched' ? 'bg-blue-100 text-blue-700 border-blue-300' : ''}`
                                                        }
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="accepted">Accepted</option>
                                                        <option value="in-process">In Process</option>
                                                        <option value="dispatched">Dispatched</option>
                                                        <option value="delivered">Delivered</option>
                                                        
                                                    </select>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">

                                                    <Link href={`/admin/orders/${order._id}`}>
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800"
                                                        >
                                                            View
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-4 text-gray-500 text-sm">
                                                    No orders found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
