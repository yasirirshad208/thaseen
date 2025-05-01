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
              const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No auth token found. User might not be logged in.");
          return;
        }
                const res = await axios.get('/api/order/get/me',{
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                });
                setOrders(res.data.orders);
            } catch (err: any) {
                console.log(err)
                setError(err.response?.data?.message || 'Failed to fetch orders');
            }
        };

        fetchCategories();
    }, []);




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
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">AED {order.totalAmount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <span className={`border text-sm rounded-md px-1 focus:outline-none
      ${order.paymentStatus === 'succeeded' ? 'bg-green-100 text-green-700 border-green-300' : ''}
      ${order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : ''}
      ${order.paymentStatus === 'failed' ? 'bg-red-100 text-red-700 border-red-300' : ''}`
                                                        } >
                                                            {order.paymentStatus}
                                                    </span>
                                                </td>

                          

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <span className={`border text-sm rounded-md px-1 focus:outline-none
      ${order.deliveryStatus === 'completed' ? 'bg-green-100 text-green-700 border-green-300' : ''}
      ${order.deliveryStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : ''}
      ${order.deliveryStatus === 'delivered' ? 'bg-blue-100 text-blue-700 border-blue-300' : ''}`
                                                        }>
                                                          {order.deliveryStatus}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">

                                                    <Link href={`/order/${order._id}`}>
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
