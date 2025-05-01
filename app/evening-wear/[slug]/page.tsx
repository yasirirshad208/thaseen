"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../ui/home/navbar/mainnavbar";
import Footer from "../../ui/home/footer/footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductFilter from "../../ui/filter/productFilter";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  sale:number;
  description: string;
  imageUrl: string | null;
}

interface Collection {
  name: string;
  products: Product[];
}

export default function CollectionPage() {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) {
      console.error("Slug is not defined");
      return;
    }

    const fetchCollection = async () => {
      try {
        const response = await axios.get(
          `/api/collection/get/${slug}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          //   },
          // }
        );

        const collectionData = response.data;
        if (collectionData) {
          const productsData = collectionData.products || [];
          const products = productsData.map((product: any) => {
            const coverImage = product.coverImage || null;

            return {
              id: product.id,
              name: product.name || "No Name Available",
              slug: product.slug || "",
              price: product.price || "Price Not Available",
              sale: product.sale,
              description: product.description || "No Description",
              imageUrl: coverImage
                ? `${coverImage}`
                : "/fallback-image-url.jpg",
            };
          });

          setCollection({
            name: collectionData.name || "Unnamed Collection",
            products,
          });

          setFilteredProducts(products); // Initialize with all products
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchCollection();
  }, [slug]);

  const handleFilter = (filtered: Product[]) => {
    setFilteredProducts(filtered);
  };

  if (!collection) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {collection.name}
          </h1>
          {/* Filter Component */}
          <ProductFilter
            products={collection.products}
            onFilter={handleFilter}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/evening-wear/${slug}/${product.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition duration-200"
              >
                <div className="aspect-w-3 aspect-h-4 overflow-hidden bg-gray-200">
                  <img
                    alt={product.name}
                    src={product.imageUrl || "/fallback-image-url.jpg"}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900 h-12 overflow-hidden">
                    {product.name}
                  </h3>
                  <div className="mt-2">
                  {product.sale > 0 ? (
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm text-gray-400 line-through">
                        {product.price}
                      </p>
                      <p className="text-md text-rose-500 font-semibold">
                        AED {(parseInt(product.price) - (parseInt(product.price) * product.sale / 100)).toFixed(2)}
                      </p>
                      <p className="text-xs text-emerald-500">
                        Save {product.sale}%
                      </p>
                    </div>
                  ) : (
                    <p className="text-md text-gray-600">
                      AED{product.price || "Price not available"}
                    </p>
                  )}
                </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products match the applied filters.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
