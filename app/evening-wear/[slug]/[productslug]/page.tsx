"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../ui/home/navbar/mainnavbar";
import Footer from "../../../ui/home/footer/footer";
import { useParams } from "next/navigation";
import ProductSize from "@/app/ui/product/productSize";
import ImageGallery from "@/app/ui/product/imageGallery";
import useCartStore from "@/app/store/cartStore";
import Alert from "@/app/ui/alerts/alert";

interface Product {
  id: number;
  name: string;
  price: number;
  description: any;
  coverImage: string | null;
  images: string[];
  sizes: string[];
  videoUrl: string | null;
  stockStatus: string | null;
  sku: string | null;
  sale: number;
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [measurements, setMeasurements] = useState({
    shoulder: "",
    hips: "",
    bust: "",
    waist: "",
    lengthFromShoulderToFloor: "",
    sleeveLength: "",
  });
  const [additionalInstructions, setAdditionalInstructions] =
    useState<string>("");

  const [alert, setAlert] = useState<{
    type: "success" | "error" | "warning" | null;
    title: string;
    message: string;
  }>({ type: null, title: "", message: "" });


  const addToCart = useCartStore((state) => state.addToCart);
  const params = useParams();
  const productSlug = Array.isArray(params?.productslug)
    ? params.productslug[0]
    : params?.productslug;

 
  useEffect(() => {
    if (!productSlug) {
      console.error("Product slug is undefined");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `/api/product/get/${productSlug}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          //   },
          // }
        );

        if (response.data) {
          const productData = response.data;
          const product = {
            id: productData._id,
            name: productData.name,
            price: productData.price,
            sizes: productData.sizes,
            sale: productData.sale,
            description: productData.description,
            coverImage: productData.coverImage
              ? `${productData.coverImage}`
              : null,
            images: productData.images
              ? productData.images.map(
                  (img: any) => `${img}`
                )
              : [],
            videoUrl: productData.video
              ? `${productData.video}`
              : null,
            stockStatus: productData.stockStatus,
            sku: productData.sku,
          };

          setProduct(product);
        } else {
          console.error("Product not found");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productSlug]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setAlert({
        type: "warning",
        title: "Size Required",
        message: "Please select a size before adding the product to the cart.",
      });
      return;
    }

    const cartItem = {
      id: String(product?.id || 0),
      name: product?.name || "",
      price:  product && product.sale > 0 
      ? product.price - (product.price * product.sale / 100) 
      : product?.price || 0,
      quantity: 1,
      imageSrc: product?.coverImage || "/placeholder.jpg",
      size: selectedSize,
      measurements,
      additionalInstructions,
      sku: product?.sku ?? null, //
    };

    addToCart(cartItem);

    setAlert({
      type: "success",
      title: "Product Added",
      message: "The product has been added to your cart.",
    });
  };

  // const renderDescription = (description: any) => {
  //   return description.map((block: any, index: number) => {
  //     if (block.type === "paragraph") {
  //       return (
  //         <p key={index} className="mt-4 text-gray-700">
  //           {block.children[0]?.text || ""}
  //         </p>
  //       );
  //     }
  //     return null;
  //   });
  // };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="bg-white mb-20 mt-20">
        <div className="pt-6">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-7">
                <ImageGallery
                  coverImage={product.coverImage}
                  images={product.images}
                  videoUrl={product.videoUrl}
                />
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="mt-4">
                {product.sale > 0 ? (
                  <div className="flex items-center gap-1.5">
                    <p className="text-lg sm:text-xl text-gray-500 line-through">
                      {product.price}
                    </p>
                    <p className="text-lg sm:text-xl text-gray-900 font-bold">
                      AED {(product.price - (product.price * product.sale / 100)).toFixed(2)}
                    </p>
                    <p className="text-xs text-emerald-500">
                      Save {product.sale}%
                    </p>
                  </div>
                ) : (
                  <p className="text-lg sm:text-xl text-gray-900 font-bold">
                    AED {product.price}
                  </p>
                )}
              </div>

                {product.stockStatus && (
                  <p className="mt-2 text-lg text-gray-500">
                    {product.stockStatus}
                  </p>
                )}

                {product.sku && (
                  <p className="mt-2 text-lg text-gray-500">
                    SKU: {product.sku}
                  </p>
                )}

                <div className="mt-6 text-lg text-gray-700 prose">
                  <div className="font-bold">Description</div>
                  {product.description}
                </div>

                <ProductSize
                sizeArray={product.sizes}
                  onSelectSize={(size) => setSelectedSize(size)}
                  onMeasurementsChange={(updatedMeasurements) =>
                    setMeasurements(updatedMeasurements)
                  }
                  onAdditionalInstructionsChange={(instructions) =>
                    setAdditionalInstructions(instructions)
                  }
                />

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-10 w-full bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700"
                >
                  Add to cart
                </button>

                {alert.type && (
                  <div className="mt-4">
                    <Alert
                      type={alert.type}
                      title={alert.title}
                      message={alert.message}
                      onClose={() =>
                        setAlert({ type: null, title: "", message: "" })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
