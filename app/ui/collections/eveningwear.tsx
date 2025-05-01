"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Collection } from "@/models/Collection";

// interface Collection {
//   id: number;
//   name: string;
//   imageUrl?: string;
//   slug: string;
// }

export default function EveningWearComponent() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const category = "Evening Wear"
        const response = await axios.get(
          `/api/collection/get?category=${category}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          //   },
          // }
        );

        const fetchedCollections = response.data
          // .filter((collection: Collection) => {
          //   // Filter collections that have the "Evening Wear" category
          //   return collection.categories.some(
          //     (category: any) => category.name === "Evening Wear"
          //   );
          // })
          .map((collection: any) => {
            const collectionName = collection.name || "No name available";
            const image = collection.image
  
            return {
              id: collection._id,
              name: collectionName,
              image,
              slug: collection.name,
            };
          })
          .sort((a: Collection, b: Collection) => {
            // Sort by year extracted from the name in descending order
            const yearA = parseInt(a.name.match(/\d+/)?.[0] || "0", 10);
            const yearB = parseInt(b.name.match(/\d+/)?.[0] || "0", 10);
            return yearB - yearA;
          });

        setCollections(fetchedCollections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Evening Wear
        </h2>
        <p className="mt-4 text-base text-gray-500">
          Discover our exclusive evening wear collection, where every design
          embodies sophistication and grace. Meticulously crafted in-house,
          <br />
          each piece reflects a timeless allure, offering the perfect statement
          for your most glamorous nights.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8">
          {collections.map((collection) => (
            <a
              key={collection.id}
              href={`/evening-wear/${collection.name}`}
              className="group block"
            >
              <div
                aria-hidden="true"
                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
              >
                <img
                  alt={collection.name}
                  src={collection.image}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {collection.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
