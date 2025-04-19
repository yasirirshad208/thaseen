"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/app/ui/home/navbar/mainnavbar";
import Footer from "@/app/ui/home/footer/footer";
import { useParams } from "next/navigation";
import ProductSize from "@/app/ui/product/productSize";
import ImageGallery from "@/app/ui/product/imageGallery";
import Alert from "@/app/ui/alerts/alert";
import useCartStore from "@/app/store/cartStore";

interface Product {
  id: string;
  name: string;
  price: number;
  sale: number;
  description: any;
  coverImage: string | null;
  images: string[];
  sizes: string[]
  videoUrl: string | null;
  stockStatus: string | null;
  sku: string | null;
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const params = useParams();
  const productSlug = params?.productslug;
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

    const addToCart = useCartStore((state) => state.addToCart);

  const [alert, setAlert] = useState<{
    type: "success" | "error" | "warning" | null;
    title: string;
    message: string;
  }>({ type: null, title: "", message: "" });

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
            description: productData.description,
            sizes: productData.sizes,
            sale: productData.sale,
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

  if (!product) {
    return <p>Loading...</p>;
  }

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

  return (
    <div>
      <NavBar />
      <div className="bg-white mb-10 mt-10">
        <div className="pt-4">
          <nav aria-label="Breadcrumb" className="px-4 sm:px-6 lg:px-8">
            <ol className="flex flex-wrap items-center space-x-2 sm:space-x-4 text-sm">
              <li>
                <a href="/home" className="font-medium text-gray-900">
                  Home /
                </a>
              </li>
              <li>
                <a href="/teens" className="font-medium text-gray-900">
                  Teens /
                </a>
              </li>
              <li className="text-gray-500">{product.name}</li>
            </ol>
          </nav>

          <div className="mx-auto mt-6 max-w-xl px-4 sm:max-w-2xl lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-7">
              <ImageGallery
                coverImage={product.coverImage}
                images={product.images}
                videoUrl={product.videoUrl}
              />
            </div>

            <div className="mt-10 lg:mt-0 lg:col-span-5 lg:col-start-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
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
                <p className="mt-2 text-sm sm:text-lg text-gray-500">
                  {product.stockStatus}
                </p>
              )}
              {product.sku && (
                <p className="mt-2 text-sm sm:text-lg text-gray-500">
                  SKU: {product.sku}
                </p>
              )}

              <div className="mt-6 text-gray-700 prose">
                <div className="font-bold">Description</div>
                {product.description}
              </div>

              <div className="mt-6">
                <ProductSize sizeArray={product.sizes} onSelectSize={(size) => setSelectedSize(size)}
                onMeasurementsChange={(updatedMeasurements) =>
                  setMeasurements(updatedMeasurements)
                }
                onAdditionalInstructionsChange={(instructions) =>
                  setAdditionalInstructions(instructions)
                }
                />
              </div>

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
      <Footer />
    </div>
  );
}
