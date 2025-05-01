'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Product } from '@/models/Product';


type Category = {
    _id: string;
    name: string;
};

type SubCategory = {
    _id: string;
    name: string;
    category: Category;
};

export default function Add() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [image, setImage] = useState('');
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/collection/add', {
                name,
                image,
                category,
                subCategory,
                products: selectedProducts,
            });

            if (res.data.success) {
                toast.success('Collection added successfully ✅');
                setName('');
                setSelectedProducts([]);
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Server error');
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/product/get');
                setAllProducts(res.data);
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Failed to fetch products');
            }
        };

        fetchProducts();
    }, []);

    const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedProducts(selectedOptions);
    };



    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                const formData = new FormData(); 
    
                    formData.append("images", files[0]);
                  
    
                try {
                    const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    });
    
                    const data = await res.json();

                    if (res.ok) {
                            setImage(data.urls[0]);
    
                    } else {
                        toast.error('Upload failed:', data.message);
                    }
                } catch (err: any) {
                    toast.error('Error uploading file:', err);
                }
            }
        };


        const [categories, setCategories] = useState<Category[]>([]);
            const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
        
            useEffect(() => {
                const fetchData = async () => {
                    try {
                        const catRes = await axios.get('/api/category/get');
                        setCategories(catRes.data);
        
                        const subCatRes = await axios.get('/api/subCategory/get');
                        setSubCategories(subCatRes.data);

                        console.log(subCatRes.data)
                    } catch (err: any) {
                        console.log(err)
                        toast.error('Failed to load categories');
                    }
                };
                fetchData();
            }, []);

    return (
        <section>
            <div className="mt-4">
                <div className="flex-1 w-full mt-6 md:mt-8 lg:mt-0">
                    <h1 className="lg:text-[64px] md:text-[54px] sm:text-[42px] text-[32px] lg:leading-[78px] md:leading-[60px] leading-[38px] font-[600]">
                        Add Collection
                    </h1>

                    <div className="lg:mt-6 md:mt-5 mt-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                    Collection Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Collection name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                   <div className="mb-6">
                   <label className='mb-[-10px]'>Cover Image</label>
                <input type='file' name="image" onChange={handleFileChange} required className="p-2 border rounded" />

                   </div>


                <div className="mb-6">
                <select name="category" value={category} onChange={(e)=>{setCategory(e.target.value)}} required className="p-2 border rounded w-full">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
                </div>

                <div className="mb-6">
                <select name="subCategory" value={subCategory} onChange={(e)=>{setSubCategory(e.target.value)}} className="p-2 border rounded w-full">
                    <option value="">Select Sub Category</option>
                    {subCategories
                        .filter((sub) => sub.category?.name === category)
                        .map((sub) => (
                            <option key={sub.name} value={sub.name}>{sub.name}</option>
                        ))}
                </select>
                </div>

                            <div className="mb-6">
                                <label htmlFor="products" className="block mb-2 text-sm font-medium text-gray-900">
                                    Select Products
                                </label>
                                <select
                                    multiple
                                    id="products"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={selectedProducts}
                                    onChange={handleProductSelect}
                                    required
                                >
                                    {allProducts.map((product) => (
                                        <option key={product._id} value={product._id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-sm text-gray-500 mt-1">Hold Ctrl (Windows) or Command (Mac) to select multiple</p>
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
    );
}
