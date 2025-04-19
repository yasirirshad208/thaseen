"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number ;
  sale:number
  coverImage: string | null;
}

const Teens: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/api/product/get?category=Thaseen Teens`,
      
        );

        

        const fetchedProducts = response.data.map(
          (product: any) => ({
            id: product.id,
            name: product.name || "Unnamed Product",
            slug: product.slug,
            sale:product.sale,
            price: product.price || "Price not available",
            coverImage: product.coverImage
              ? `${product.coverImage}`
              : null,
          })
        );

        setProducts(fetchedProducts || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Teens products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Thaseen Teens Collection
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/teens/${product.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition duration-200"
            >
              {product.coverImage ? (
                <div className="aspect-w-3 aspect-h-4 overflow-hidden bg-gray-200">
                  <img
                    src={product.coverImage}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-w-3 aspect-h-4 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <p>No Image</p>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <div className="mt-2">
                  {product.sale > 0 ? (
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm text-gray-400 line-through">
                        {product.price}
                      </p>
                      <p className="text-md text-rose-500 font-semibold">
                        AED {(product.price - (product.price * product.sale / 100)).toFixed(2)}
                      </p>
                      <p className="text-xs text-emerald-500">
                        Save {product.sale}%
                      </p>
                    </div>
                  ) : (
                    <p className="text-md text-gray-600">
                      AED {product.price?.toFixed(2) || "Price not available"}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products available in this category.</p>
      )}
    </div>
  );
};

export default Teens;
