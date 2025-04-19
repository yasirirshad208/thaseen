'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Collection } from '@/models/Collection';



export default function Category() {
    const [categories, setCategories] = useState<Collection[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/collection/get');
                setCategories(res.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch collections');
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
    try {
        const res = await axios.delete(`/api/collection/${id}`);
        if (res.data.success) {
            toast.success('Collection deleted successfully ✅');

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
                    <h2 className="text-[26px] font-bold">Collections</h2>
                    <Link href="/admin/collection/add">
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
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Sub Category</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Image</th>
                                            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {categories.map((category: Collection) => (
                                            <tr key={category._id} className="hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.subCategory}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    <img src={category.image} className='w-[50px] h-[50px] object-cover rounded-[5px]' alt="Cover Image" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800"
                                                        onClick={() => handleDelete(category._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link className='ml-2' href={`/admin/collection/update/${category.name}`}>
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
                                                    No collections found.
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
