// Footer.tsx
"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Contact Information */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-2">admin@thaseen.com</p>
          <p className="text-gray-400 mb-2">
            Whats App:{" "}
            <a
              href="tel:+971565761000"
              className="text-gray-400 hover:text-gray-200"
            >
              +971 56 576 1000
            </a>
          </p>
          <p className="text-gray-400">
            Office 209, Avenue by YA, Mirdif, Dubai, UAE
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/terms" className="text-gray-400 hover:text-gray-200">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-gray-200"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
          <p className="text-gray-400 mb-4">
            Follow us on our social channels for style inspiration and exclusive
            offers.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
            <Link
              href="https://www.instagram.com/tha.seen"
              aria-label="Instagram"
              className="text-gray-400 hover:text-gray-200"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://www.facebook.com/p/thaseen-100063480069844/"
              aria-label="Facebook"
              className="text-gray-400 hover:text-gray-200"
            >
              <FaFacebook size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} THASEEN. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
