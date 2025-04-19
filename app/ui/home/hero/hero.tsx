"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeaderImage {
  heroImage: string;
}

const Hero = ({ heroImage }: HeaderImage) => {
  // const [headerImage, setHeaderImage] = useState<HeaderImage | null>(null);

  // useEffect(() => {
  //   const fetchHeaderImage = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:1337/api/header?populate=*`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  //           },
  //         }
  //       );

  //       const data = response.data.data;
  //       console.log("Fetched header image:", data);

  //       if (data && data.image1) {
  //         setHeaderImage({
  //           url: `http://localhost:1337${data.image1.url}`,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching header image:", error);
  //     }
  //   };

  //   fetchHeaderImage();
  // }, []);

  // if (!headerImage) {
  //   return <p>Loading...</p>;
  // }

  console.log(heroImage)

  return (
    <div className="relative h-[90vh] w-full">
      {/* Background Image */}
      <Image
    src={heroImage}
    alt="Fashion Collection"
    fill
    className="rounded-md object-cover"
    priority
  />

      {/* Overlay and Text */}
      <div className="absolute inset-0 flex items-center justify-center text-center bg-black bg-opacity-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="px-4"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-6xl font-bold text-zinc-200 mb-4 tracking-wide"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            ELEVATE YOUR STYLE
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="sm:text-2xl text-xl  sm:mb-8 mb-6 text-zinc-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            An Exclusive Edit of Timeless Fashion
          </motion.p>

          {/* Animated Button */}
          <motion.div
            whileHover={{ scale: 1.1 }} // Expands on hover
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href="/evening-wear"
              className="inline-block bg-black text-white px-8 py-4 rounded-md text-lg tracking-wide shadow-md transition duration-300 ease-in-out hover:bg-zinc-900"
            >
              SHOP NOW
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
