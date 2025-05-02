'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Collection } from '@/models/Collection';

type Category = {
    _id: string;
    name: string;
};

type SubCategory = {
    _id: string;
    name: string;
    category: string;
};

export default function UpdateProduct({ params }: { params: { slug: string } }) {
    const router = useRouter()
    const [form, setForm] = useState({
        _id:"",
        name: '',
        stockStatus: '',
        coverImage: '',
        images: [] as string[],
        slug: '',
        sku: '',
        price: 0,
        description: '',
        bestSeller: false,
        category: '',
        subCategory: '',
        video:"",
        sale:"",
        sizes: [] as string[]
    });

      const [sizeInput, setSizeInput] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
        const [collectionId, setCollectionId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const catRes = await axios.get('/api/category/get');
                setCategories(catRes.data);

                const subCatRes = await axios.get('/api/subCategory/get');
                setSubCategories(subCatRes.data);
            } catch (err: any) {
                toast.error('Failed to load categories');
            }
        };

        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/product/get/${params.slug}`);
                const data = res.data
                setForm((prev) => ({
                    ...prev,
                    _id:data._id,
                    name: data.name,
                    stockStatus: data.stockStatus,
                    coverImage: data.coverImage,
                    images: data.images,
                    slug: data.slug,
                    sku: data.sku,
                    price: data.price,
                    description: data.description,
                    bestSeller: data.bestSeller,
                    category: data.category,
                    subCategory: data.subCategory,
                    video:data.video,
                    sizes:data.sizes,
                    sale:data.sale
                }));
            } catch (error:any) {
                router.push("/admin/product")
            }
        }

        fetchProduct()

        fetchData();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const target = e.target;

        // If the target is a checkbox input
        if (target instanceof HTMLInputElement && target.type === 'checkbox') {
            setForm((prev) => ({
                ...prev,
                [target.name]: target.checked,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [target.name]: target.value,
            }));
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const formData = new FormData(); 

            if (e.target.name === "coverImage") {
                formData.append("images", files[0]); // single file
              }else if(e.target.name === "video"){
                formData.append("images", files[0]);
              } else {
                Array.from(files).forEach((file) => {
                  formData.append("images", file); // multiple files, same key
                });
              }

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();


                if (res.ok) {

                    if (e.target.name === "coverImage") {
                        setForm((prev) => ({
                            ...prev,
                            coverImage: data.urls[0],
                        }));
                    }else if (e.target.name === "video") {
                        setForm((prev) => ({
                            ...prev,
                            video: data.urls[0],
                        }));
                    } else {
                        setForm((prev) => ({
                            ...prev,
                            images: data.urls,
                        }));
                    }


                } else {
                    toast.error('Upload failed:', data.message);
                }
            } catch (err: any) {
                toast.error('Error uploading file:', err);
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.put('/api/product/update', form);
            if (res.data.success) {
                if(collectionId){

                    await addToCollection(form._id)
                }
                toast.success('Product updated successfully ✅');
                router.push("/admin/product")
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Server error');
        }
    };



     const addToCollection = async (productId:string) => {
    
        const matchedCollection = collections.find((sub: any) => sub._id === collectionId);

        if (!matchedCollection) {
          return;
        }
        
        const preselected = matchedCollection.products
        ?.map((item: any) => {
          if (item && typeof item === 'object' && item._id) return item._id;
          if (typeof item === 'string') return item;
          return null;
        })
        .filter((id: any) => !!id); // remove nulls
      
      const selectedOptions = [productId, ...preselected];
        

        try {
            const res = await axios.put('/api/collection/update', {
                id: matchedCollection._id,
                name: matchedCollection.name,
                image: matchedCollection.image,
                category: matchedCollection.category,
                subCategory: matchedCollection.subCategory,
                products: selectedOptions,
            });

            if (res.data.success) {
                
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
        } catch (err: any) {
            console.log(err)
            toast.error(err.response?.data?.message || 'Server error');
        }
        };

    return (
        <section className="p-4">
            <h1 className="text-3xl font-semibold mb-6">Update Product</h1>
            <form onSubmit={handleSubmit} className="grid gap-5">
            <label className='mb-[-10px]'>Name</label>
                <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required className="p-2 border rounded" />
                <label className='mb-[-10px]'>Stock</label>
                <select name="stockStatus" value={form.stockStatus} onChange={handleChange} className="p-2 border rounded">
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
                <label className='mb-[-10px]'>Cover Image</label>
                <input type='file' name="coverImage" onChange={handleFileChange} className="p-2 border rounded" />
                <label className='mb-[-10px]'>Images</label>
                <input type='file' multiple name="images" onChange={handleFileChange} className="p-2 border rounded" />
                <label className='mb-[-10px]'>Video</label>
                <input type='file' name="video" onChange={handleFileChange}  className="p-2 border rounded" />
                <label className='mb-[-10px]'>Slug</label>
                <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} required className="p-2 border rounded" />
                <label className='mb-[-10px]'>SKU</label>
                <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} required className="p-2 border rounded" />
                <label className='mb-[-10px]'>Price</label>
                <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="p-2 border rounded" />
                <label className='mb-[-10px]'>Sale</label>
                <div className='w-full'>
                <input name="sale" type='number' placeholder="Sale in %" value={form.sale} onChange={handleChange} className="p-2 border rounded" />
                <div className='mt-0.5 text-[14px] text-gray-500'>If you want to end sale just write 0</div>
                
                </div>
                <label className='mb-[-10px]'>Description</label>
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="p-2 border rounded" />
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="bestSeller" checked={form.bestSeller} onChange={handleChange} />
                    Best Seller?
                </label>

                <div>
  <label className="block mb-1">Sizes</label>
  <div className="flex gap-2 mb-2">
    <input
      type="text"
      value={sizeInput}
      onChange={(e) => setSizeInput(e.target.value)}
      placeholder="Enter size like: S, M, L, XL"
      className="p-2 border rounded"
    />
    <button
      type="button"
      onClick={() => {
        if (sizeInput.trim() !== '') {
          setForm((prev) => ({
            ...prev,
            sizes: [...prev.sizes, sizeInput.trim()]
          }));
          setSizeInput('');
        }
      }}
      className="px-3 py-2 bg-green-600 text-white rounded"
    >
      Add
    </button>
  </div>

  <div className="flex gap-2 flex-wrap">
    {form.sizes.map((size, index) => (
      <div
        key={index}
        className="flex items-center gap-1 bg-gray-200 text-black px-2 py-1 rounded"
      >
        {size}
        <button
          type="button"
          onClick={() => {
            setForm((prev) => ({
              ...prev,
              sizes: prev.sizes.filter((s) => s !== size)
            }));
          }}
          className="ml-1 text-red-500 hover:text-red-700"
        >
          &times;
        </button>
      </div>
    ))}
  </div>
</div>

                <select name="category" value={form.category} onChange={handleChange} required className="p-2 border rounded">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>

                <select name="subCategory" value={form.subCategory} onChange={handleChange} className="p-2 border rounded">
                    <option value="">Select Sub Category</option>
                    {subCategories
                        .filter((sub) => sub.category === form.category)
                        .map((sub) => (
                            <option key={sub.name} value={sub.name}>{sub.name}</option>
                        ))}
                </select>

                <select name="collection" value={collectionId} onChange={(e)=>setCollectionId(e.target.value)} className="p-2 border rounded">
                    <option value="">Select Collection</option>
                    {collections
                        .filter((sub) =>
                            form.subCategory
                        ? sub.category === form.category && sub.subCategory === form.subCategory
                        : sub.category === form.category
                        )
                        .map((sub) => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                        ))}
                </select>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Submit
                </button>
            </form>
        </section>
    );
}
