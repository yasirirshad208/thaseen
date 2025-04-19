"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import Profile from "./profile";
import Orders from "./orders";
import Wishlist from "./wishlist";

export default function AccountDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const verifyToken = async () => {
      try {
        const response = await fetch("/api/me", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token invalid or expired");
        }

        setIsLoading(false);
      } catch (error) {
        localStorage.removeItem("authToken");
        router.push("/login");
      }
    };

    if (token) {
      verifyToken();
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading your account...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="flex justify-between items-center bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl mt-20">
        <h2 className="text-3xl font-bold text-gray-900">Account</h2>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-black text-white px-4 py-2 hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-1 w-full max-w-5xl mt-6 gap-6 mb-6">
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-6">
          <motion.div whileHover={{ scale: 1.05 }} className="mb-6">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${
                activeTab === "profile"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaUser className="mr-3" />
              Profile
            </button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="mb-6">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${
                activeTab === "orders"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaShoppingCart className="mr-3" />
              Orders
            </button>
          </motion.div>
          {/* <motion.div whileHover={{ scale: 1.05 }} className="mb-6">
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${
                activeTab === "wishlist"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaHeart className="mr-3" />
              Wishlist
            </button>
          </motion.div> */}
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-lg p-6 overflow-auto">
          {activeTab === "profile" && <Profile />}
          {activeTab === "orders" && <Orders />}
          {/* {activeTab === "wishlist" && <Wishlist />} */}
        </div>
      </div>
    </div>
  );
}
