'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Product } from '@/models/Product';
import { Ui } from '@/models/Ui';



export default function Category() {
    const [products, setProducts] = useState<Ui[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/ui-images/get');
                setProducts(res.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch');
            }
        };

        fetchCategories();
    }, []);



    return (
        <>
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[26px] font-bold">UI Elelments</h2>
        
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
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Header</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Ready Wear</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Contact</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Title</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Contact No</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Availibility</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Description</th>
                                            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {products.map((product: Ui) => (
                                            <tr key={product._id} className="hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    <img src={product.headerImage} className='w-[50px] h-[50px] object-cover rounded-[5px]' alt="Cover Image" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    <img src={product.readyToWearImage} className='w-[50px] h-[50px] object-cover rounded-[5px]' alt="Cover Image" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    <img src={product.contactImage} className='w-[50px] h-[50px] object-cover rounded-[5px]' alt="Cover Image" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.contact_info}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    {product.availibility?.split(' ').slice(0, 4).join(' ')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    {product.description?.split(' ').slice(0, 4).join(' ')}
                                                </td>


                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">

                                                    <Link href={`/admin/ui/update/${product._id}`}>
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
                                        {products.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-4 text-gray-500 text-sm">
                                                    No products found.
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
