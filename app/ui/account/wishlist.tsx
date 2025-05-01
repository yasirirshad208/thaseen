import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  coverImage?: string;
}

interface WishlistItem {
  id: number;
  products: Product[];
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      console.log("Fetching wishlist...");
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:1337/api/wishlists?populate=products.coverImage",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        console.log("Full API Response:", response.data);

        const wishlistData = response.data.data.map(
          (item: any, index: number) => {
            console.log(`Raw Data for wishlist item ${index + 1}:`, item);

            const products = item.products || item.products || [];
            console.log(
              "Raw Products Data for wishlist item:",
              item.id,
              products
            );

            if (!Array.isArray(products)) {
              console.warn(
                `No valid 'products' array found in wishlist item ${item.id}`,
                item
              );
              return { id: item.id, products: [] };
            }

            const mappedProducts = products.map((product: any) => ({
              id: product.id || -1,
              name: product.name || "Unnamed Product",
              price: product.price || 0,
              coverImage: product.coverImage?.formats?.thumbnail?.url || "",
            }));

            console.log(
              `Mapped Products for wishlist item ${item.id}:`,
              mappedProducts
            );

            return {
              id: item.id,
              products: mappedProducts,
            };
          }
        );

        console.log("Mapped Wishlist Data:", wishlistData);
        setWishlist(wishlistData);
      } catch (err: any) {
        console.error("Failed to fetch wishlist:", err);
        setError(
          err.message || "An error occurred while fetching the wishlist."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.map((item) => (
        <div key={item.id}>
          <h2>Wishlist Item {item.id}</h2>
          {item.products.length > 0 ? (
            <ul>
              {item.products.map((product) => (
                <li key={product.id}>
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  {product.coverImage && (
                    <img src={product.coverImage} alt={product.name} />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No products in this wishlist.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
