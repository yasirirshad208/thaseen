'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Category = {
    _id: string;
    name: string;
    createdAt: string;
  };

  type SubCategory = {
    _id: string;
    name: string;
    category:string;
    createdAt: string;
  };

export default function SubCategory() {
    const [categories, setCategories] = useState<SubCategory[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/subCategory/get');
                setCategories(res.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
    try {
        const res = await axios.delete(`/api/subCategory/${id}`);
        if (res.data.success) {
            toast.success('Sub Category deleted successfully ✅');

        } else {
            toast.error(res.data.message || 'Something went wrong');
        }
        setCategories(categories.filter(c => c._id !== id));
    } catch (err:any) {
        console.log(err)
        toast.error(err?.response?.data?.message || 'Server error');
    }
};


    return (
        <>
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[26px] font-bold">Sub Categories</h2>
                    <Link href="/admin/sub-category/add">
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
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Category</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Created At</th>
                                            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {categories.map((category: SubCategory) => (
                                            <tr key={category._id} className="hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    {new Date(category.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800"
                                                        onClick={() => handleDelete(category._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {categories.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-4 text-gray-500 text-sm">
                                                    No categories found.
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
