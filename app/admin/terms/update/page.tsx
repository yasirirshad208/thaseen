'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function TermsUpdate() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);


  const handleUpdate = async () => {
    try {
      const response = await axios.put('/api/terms/update', { content });
      if (response.status === 200) {
        toast.success('Updated successfully!');
      } else {
        toast.error('Failed to update.');
      }
    } catch (error) {
        toast.error('An error occurred.');
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          <div className="flex-grow">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-full"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="mt-14 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Update Terms
          </button>
        </>
      )}
    </div>
  );
}
