"use client";

import { FaUser, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthAdmin } from "@/context/AuthAdminContext";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { isAdmin } = useAuthAdmin();

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // useEffect(() => {
  //   if (darkMode) {
  //     document.body.classList.add("dark-mode");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //   }
  // }, [darkMode]);

  const handleAccountClick = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      router.push("/account");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="relative">
      <div className="text-white text-center p-2 text-sm bg-black">
        All orders will take 2-3 weeks to be shipped.
      </div>

      <nav className="bg-black text-white px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-24 h-12 flex items-center">
              <img
                src="/logo-thaseen.webp"
                alt="Tha-Seen Logo"
                className="w-full h-auto object-contain"
              />
            </div>
          </Link>

         

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li className="hover:text-gray-400">
              <Link href="/home">HOME</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/evening-wear">EVENING WEAR</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/seasonal">SEASONAL</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/teens">THASEEN TEENS</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/bestseller">BEST SELLER</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/sale">SALE</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/contact">CONTACT US</Link>
            </li>
            {isAdmin && (
              <li className="hover:text-gray-400">
                <Link href="/admin/category">ADMIN</Link>
              </li>
            )}
          </ul>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={handleAccountClick}
              className="hover:text-gray-400"
              aria-label="Account"
            >
              <FaUser />
            </button>
            <Link href="/cart" className="hover:text-gray-400">
              <FaShoppingBag />
            </Link>

             {/* Hamburger (mobile only) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-xl"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <ul className="flex flex-col md:hidden mt-4 space-y-4">
            <li className="hover:text-gray-400">
              <Link href="/home" onClick={toggleMobileMenu}>HOME</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/evening-wear" onClick={toggleMobileMenu}>EVENING WEAR</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/seasonal" onClick={toggleMobileMenu}>SEASONAL</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/teens" onClick={toggleMobileMenu}>THASEEN TEENS</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/bestseller" onClick={toggleMobileMenu}>BEST SELLER</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/sale" onClick={toggleMobileMenu}>SALE</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="/contact" onClick={toggleMobileMenu}>CONTACT US</Link>
            </li>
            {isAdmin && (
              <li className="hover:text-gray-400">
                <Link href="/admin/category" onClick={toggleMobileMenu}>ADMIN</Link>
              </li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
