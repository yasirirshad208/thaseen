"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  sale:number
  description: string;
  imageUrl: string | null;
}

interface ProductFilterProps {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
}

export default function ProductFilter({
  products,
  onFilter,
}: ProductFilterProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    let sortedProducts = [...products];

    if (sortOrder === "asc") {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    onFilter(sortedProducts);
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium text-black">Sort by:</label>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        className="text-sm p-2 focus:outline-none rounded-md bg-transparent border border-gray-300"
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      <button
        onClick={handleSort}
        className="px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800"
      >
        Apply
      </button>
    </div>
  );
}
