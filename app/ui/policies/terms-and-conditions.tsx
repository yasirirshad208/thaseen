"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface PolicyData {
  privacy: string;
  last_updated: string;
}

const TermsConditions = () => {
  const [policy, setPolicy] = useState<PolicyData | null>(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`/api/terms/get`);

        const data = response.data;
        setPolicy({
          privacy: data.content,
          last_updated: data.updatedAt,
        });
      } catch (error) {
        console.error("Error fetching policy data:", error);
      }
    };

    fetchPolicy();
  }, []);

  if (!policy) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">
  Last Updated: {new Date(policy.last_updated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
</p>


      <div>

        <div className="prose prose-lg text-gray-600" dangerouslySetInnerHTML={{ __html: policy.privacy }} />
      </div>
    </div>
  );
};

export default TermsConditions;
