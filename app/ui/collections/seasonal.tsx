"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Subcategory {
  id: number;
  name: string;
  slug: string;
}

export default function SeasonalComponent() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "/api/subCategory/get?category=Seasonal",
          // {
          //   headers: {
          //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          //   },
          // }
        );

        const fetchedSubcategories = response.data.map(
          (subcategory: any) => ({
            id: subcategory._id,
            name: subcategory.name,
            slug: subcategory.name,
          })
        );

        setSubcategories(fetchedSubcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Seasonal Subcategories
        </h2>
        <p className="mt-4 text-base text-gray-500">
          Choose a seasonal subcategory to explore the collections within.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8">
          {subcategories.map((subcategory) => (
            <a
              key={subcategory.id}
              href={`/seasonal/${subcategory.slug}`}
              className="group block"
            >
              <div className="rounded-lg border p-4">
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {subcategory.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
