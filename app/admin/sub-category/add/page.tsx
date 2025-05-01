'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

type Category = {
    _id: string;
    name: string;
    createdAt: string;
  };

export default function Add() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/subCategory/add', { name, category });

            if (res.data.success) {
                toast.success('Sub category added successfully ✅');
                setName('');
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Server error');
        }
    };

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/category/get');
                setCategories(res.data);
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <section>
                <div className="mt-4">
                    <div className="flex-1 w-full mt-6 md:mt-8 lg:mt-0">
                        <h1 className="lg:text-[64px] md:text-[54px] sm:text-[42px] text-[32px] lg:leading-[78px] md:leading-[60px] leading-[38px] font-[600]">
                            Add Sub Category
                        </h1>

                        <div className="lg:mt-6 md:mt-5 mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Category name..."
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                    <select name="category" id="category" required onChange={(e) => setCategory(e.target.value)} className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                                        <option value="">Select category</option>
                                        {categories.map((cat:Category)=>{
                                           return <option value={cat.name}>{cat.name}</option>
                                        })

                                        }
                                        
                                    </select>
                                </div>


                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
