"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/app/ui/home/navbar/mainnavbar";
import Footer from "@/app/ui/home/footer/footer";
import ProductFilter from "@/app/ui/filter/productFilter";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string ;
  sale:number;
  coverImage: string | null;
  imageUrl?: string | null;
}

export default function CollectionProductsPage() {
  const params = useParams();

  const slug = params.slug;
  const collectionslugRaw = params.collectionslug;

  const collectionSlug = Array.isArray(collectionslugRaw)
    ? collectionslugRaw[0]
    : collectionslugRaw;


  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || !collectionSlug) {
      console.error("One or more slugs are undefined", {
        slug,
        collectionSlug,
      });
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/api/collection/get/${collectionSlug}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          //   },
          // }
        );


        const fetchedCollection = response.data;
        if (fetchedCollection && fetchedCollection.products) {
          const fetchedProducts = fetchedCollection.products.map(
            (product: any) => ({
              id: product._id,
              name: product.name || "Unnamed Product",
              slug: product.slug,
              sale: product.sale,
              price: product.price || "Price not available",
              coverImage: product.coverImage
                ? `${product.coverImage}`
                : null,
              imageUrl: product.coverImage
                ? `${product.coverImage}`
                : null,
            })
          );
          setProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);
        } else {
          console.warn("No products found in the collection.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug, collectionSlug]);

  const handleFilter = (filtered: Product[]) => {
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <p>Loading...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {collectionSlug
              ? collectionSlug.charAt(0).toUpperCase() + collectionSlug.slice(1)
              : "Undefined"}
          </h1>

          {/* <ProductFilter products={products} onFilter={handleFilter} /> */}
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/seasonal/${slug}/${collectionSlug}/${product.slug}`} // Construct URL for product page
              >
                <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition duration-200">
                  {product.imageUrl ? (
                    <div className="aspect-w-3 aspect-h-4 overflow-hidden bg-gray-200">
                      <img
                        src={product.imageUrl}
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
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No products match the applied filters.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
