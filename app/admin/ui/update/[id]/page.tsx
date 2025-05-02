'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Ui } from '@/models/Ui';



export default function UpdateProduct({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [form, setForm] = useState({
        _id:"",
        headerImage: '',
        readyToWearImage: '',
        contactImage: '',
        title: "",
        contact_info: '',
        availibility: '',
        description: '',
    });

    const [disabled, setDisabled] = useState(false)


    useEffect(() => {
       
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/ui-images/get/${params.id}`);
                const data = res.data
                setForm((prev) => ({
                    ...prev,
                    _id:data._id,
                    headerImage: data.headerImage,
                    readyToWearImage: data.readyToWearImage,
                    contactImage: data.contactImage,
                    title: data.title,
                    contact_info: data.contact_info,
                    availibility: data.availibility,
                    description: data.description,
                }));
            } catch (error:any) {
                router.push("/admin/product")
            }
        }

        fetchProduct()

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
        setDisabled(true)
        const files = e.target.files;
        if (files && files.length > 0) {
            const formData = new FormData(); 

                formData.append("images", files[0]); // single file
              

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();


                if (res.ok) {

                    if (e.target.name === "headerImage") {
                        setForm((prev) => ({
                            ...prev,
                            headerImage: data.urls[0],
                        }));
                    }else if (e.target.name === "contactImage") {
                        setForm((prev) => ({
                            ...prev,
                            contactImage: data.urls[0],
                        }));
                    } else {
                        setForm((prev) => ({
                            ...prev,
                            readyToWearImage: data.urls[0],
                        }));
                    }


                } else {
                    toast.error('Upload failed:', data.message);
                }
            } catch (err: any) {
                toast.error('Error uploading file:', err.response.data.message);
            }finally{
                setDisabled(false)
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.put('/api/ui-images/update', form);
            if (res.data.success) {
                toast.success('Updated successfully ✅');
                router.push("/admin/ui")
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Server error');
        }
    };

    return (
        <section className="p-4">
            <h1 className="text-3xl font-semibold mb-6">Update Product</h1>
            <form onSubmit={handleSubmit} className="grid gap-5">
               
                <label className='mb-[-10px]'>Header Image</label>
                <input type='file' name="headerImage" onChange={handleFileChange} className="p-2 border rounded" />
                <label className='mb-[-10px]'>Ready To Wear Image</label>
                <input type='file' name="readyToWearImage" onChange={handleFileChange}  className="p-2 border rounded" />
                 <label className='mb-[-10px]'>Contact Image</label>
                <input type='file' name="contactImage" onChange={handleFileChange}  className="p-2 border rounded" />
                
                <h2 className="text-[22px] font-bold">Appointment Details</h2>

                <label className='mb-[-10px]'>Title</label>
                <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="p-2 border rounded" />
                <label className='mb-[-10px]'>Contact Info</label>
                <input name="contact_info" placeholder="Contact Info" value={form.contact_info} onChange={handleChange} required className="p-2 border rounded" />
                <label className='mb-[-10px]'>Availibility</label>
                <input name="availibility" type="text" placeholder="Availibility" value={form.availibility} onChange={handleChange} required className="p-2 border rounded" />
                <label className='mb-[-10px]'>Description</label>
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="p-2 border rounded" />
                

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled={disabled}
                >
                    Submit
                </button>
            </form>
        </section>
    );
}
