'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Contact } from '@/models/Contact';



export default function Category() {
    const [categories, setCategories] = useState<Contact[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/contact/get');
                setCategories(res.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch contacts');
            }
        };

        fetchCategories();
    }, []);
  


    return (
        <>
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[26px] font-bold">Contact</h2>
                    {/* <Link href="/admin/category/add">
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
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Subject</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Message</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {categories.map((category: Contact) => (
                                            <tr key={category._id} className="hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.phone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.subject}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{category.message}</td>
                                                
                                            </tr>
                                        ))}
                                        {categories.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-4 text-gray-500 text-sm">
                                                    No contacts found.
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
