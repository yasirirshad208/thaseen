'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Product } from '@/models/Product';



export default function Category() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/product/get');
                setProducts(res.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch products');
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
    try {
        const res = await axios.delete(`/api/product/${id}`);
        if (res.data.success) {
            toast.success('Product deleted successfully ✅');

        } else {
            toast.error(res.data.message || 'Something went wrong');
        }
        setProducts(products.filter(c => c._id !== id));
    } catch (err:any) {
        toast.error(err?.response?.data?.message || 'Server error');
    }
};


    return (
        <>
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[26px] font-bold">Products</h2>
                    <Link href="/admin/product/add">
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
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Stock</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Price</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Sale</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Best Seller</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Category</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Sub Category</th>
                                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Image</th>
                                            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {products.map((product: Product) => (
                                            <tr key={product._id} className="hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.stockStatus}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.sale || 0}%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.bestSeller ? "Yes" : "No"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.subCategory ? product.subCategory : "N/A"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    <img src={product.coverImage} className='w-[50px] h-[50px] object-cover rounded-[5px]' alt="Cover Image" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button
                                                        type="button"
                                                        className="inline-flex mr-2 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800"
                                                        onClick={() => handleDelete(product._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link href={`/admin/product/update/${product.slug}`}>
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
