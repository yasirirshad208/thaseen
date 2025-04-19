"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";

interface DiscoverData {
  featuredImage: string | null;
}

export default function FeaturedOnSection({featuredImage}:DiscoverData) {
  // const [discover, setDiscover] = useState<DiscoverData | null>({imageUrl:"/discover.png"});

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  handleResize(); // Set initially
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  // useEffect(() => {
  //   const fetchDiscoverData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:1337/api/discover?populate=image1",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  //           },
  //         }
  //       );

  //       const data = response.data.data;

  //       const imageUrl = data?.image1?.url
  //         ? `http://localhost:1337${data.image1.url}`
  //         : null;

  //       setDiscover({ imageUrl });
  //     } catch (error) {
  //       console.error("Error fetching discover data:", error);
  //     }
  //   };

  //   fetchDiscoverData();
  // }, []);

  // if (!discover) return null;

  return (
    <>
  <div className="w-full border-t border-gray-300 my-12"></div>

  {/* Main Section */}
  <motion.div
    className="bg-white py-12 px-4"
    initial={isMobile ? false : { opacity: 0, y: 50 }}
    animate={isMobile ? false : { opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Section: Image */}
      {featuredImage && (
        <motion.div
        initial={!isMobile ? { x: -50, opacity: 0 } : undefined}
        whileInView={!isMobile ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
          <Image
            src={featuredImage}
            alt="Discover Tha Seen"
            width={600}
            height={800}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      )}

      {/* Right Section */}
      <motion.div
  className="space-y-6"
  initial={!isMobile ? { x: 50, opacity: 0 } : undefined}
  whileInView={!isMobile ? { x: 0, opacity: 1 } : undefined}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
        <h2 className="text-4xl sm:text-5xl text-gray-900 mr-20">
          READY-TO-WEAR
        </h2>
        <p className="text-lg text-gray-600 leading-8">
          Our collection is available on
        </p>

        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6">
          <motion.a
            href="https://www.ounass.ae/women/designers/tha-seen?srsltid=AfmBOorFHxwtiJP9UjaAuXsmT5SUI0O1U04w1BDL_xJt4rbGDRvmfiAT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-lg bg-black md:px-10 px-6 md:py-6 py-3 text-white shadow-md"
            whileHover={isMobile ? {} : { scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ounass
          </motion.a>

          <motion.a
            href="https://www.galerieslafayette.qa/shop/product-brands/tha-seen/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-black md:px-10 px-6 md:py-6 py-3 text-lg text-white shadow-md"
            whileHover={isMobile ? {} : { scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Galeries Lafayette Doha
          </motion.a>
        </div>
      </motion.div>
    </div>
  </motion.div>
</>

  );
}
