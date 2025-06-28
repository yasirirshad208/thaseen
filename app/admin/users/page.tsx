'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { User } from '@/models/User';



export default function Category() {
    const [categories, setCategories] = useState<User[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/users');
                setCategories(res.data.users);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);


    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/users/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminStatus: newStatus }),
            });

            // Refresh or update UI state here
        } catch (error) {
            toast.error("Error updating admin status");
        }
    };


    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(`/api/users/delete/${id}`);
            if (res.data.success) {
                toast.success('User deleted successfully ✅');
    
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
            setCategories(categories.filter(c => c._id !== id));
        } catch (err:any) {
            toast.error(err?.response?.data?.message || 'Server error');
        }
    };




    return (
        <>
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[26px] font-bold">Users</h2>
                    <Link href="/admin/users/add">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded text-[14px]">
                            Add
                        </button>
                    </Link>
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
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Admin</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {categories.map((category: User) => (
                                            <tr key={category._id} className="hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.phone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <select
                                                        onChange={(e) => handleStatusChange(category._id, e.target.value)}
                                                        className={`border text-sm rounded-md p-1 focus:outline-none
      ${category.admin ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}
      `
                                                        }
                                                    >
                                                        <option selected={category.admin ? true : false} value="true">Yes</option>
                                                        <option value="false" selected={category.admin ? false : true}>No</option>
                                                    </select>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button
                                                        type="button"
                                                        className="inline-flex mr-2 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800"
                                                        onClick={() => handleDelete(category._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link href={`/admin/users/update/${category._id}`}>
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800"
                                                        >
                                                            Update
                                                        </button>
                                                    </Link>
                                                </td>

                                            </tr>
                                        ))}
                                        {categories.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-4 text-gray-500 text-sm">
                                                    No users found.
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
