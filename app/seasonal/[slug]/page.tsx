"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../ui/home/navbar/mainnavbar";
import Footer from "../../ui/home/footer/footer";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Collection {
  id: number;
  name: string;
  slug: string;
  collectionImage: string | null;
  createdAt: string;
}

export default function SubcategoryCollectionsPage() {
  const { slug } = useParams();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      console.error("Subcategory slug is undefined");
      return;
    }

    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          `/api/collection/get?subCategory=${slug}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          //   },
          // }
        );

        console.log(slug)

        console.log(response.data)

        const fetchedSubcategory = response.data;
        if (fetchedSubcategory) {
          const collections = fetchedSubcategory
            .map((collection: any) => ({
              id: collection._id,
              name: collection.name,
              slug: collection.name,
              collectionImage: collection.image
                ? `${collection.image}`
                : "/fallback-image-url.jpg",
              createdAt: collection.createdAt,
            }))
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

          setCollections(collections);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Tha Seen{" "}
          {typeof slug === "string"
            ? slug.charAt(0).toUpperCase() + slug.slice(1)
            : ""}
        </h1>
        {collections.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/seasonal/${slug}/${collection.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition duration-200"
              >
                {collection.collectionImage ? (
                  <div className="aspect-w-3 aspect-h-4 overflow-hidden bg-gray-200">
                    <img
                      alt={collection.name}
                      src={collection.collectionImage}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-w-3 aspect-h-4 overflow-hidden bg-gray-200 flex items-center justify-center">
                    <p>No Image</p>
                  </div>
                )}
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No collections available for this subcategory.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
