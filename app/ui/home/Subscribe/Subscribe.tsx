"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface SubscriptionSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function SubscriptionSuccessPopup({
  isOpen,
  onClose,
}: SubscriptionSuccessPopupProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-sm sm:w-full">
          <div className="flex justify-center items-center w-12 h-12 mx-auto bg-green-100 rounded-full">
            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Subscription Successful!
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Thank you for joining our exclusive circle. You will now receive
                updates on our latest collections and offers.
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      data: {
        email: email,
        date: new Date().toISOString(),
      },
    };

    console.log("Submitting payload:", payload);

    try {
      // const response = await axios.post(
      //   `http://localhost:1337/api/subscribes`,
      //   payload,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      toast.success("submitted")
    } catch (error) {
      console.error("Error:", error);
      if (error) {
        console.error("Response error:", error);
      }
    }
  };

  return (
    <div className="bg-black py-12 px-4 border-t border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Text Section */}
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-3xl mb-2 tracking-wide text-white">
            Stay in the loop
          </h2>
          <p className="text-lg text-white">
            Be the first to discover our latest collections, style inspiration,
            and exclusive offers crafted just for you.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 md:w-1/2"
        >
          <input
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Your email address"
            className="p-2 border border-gray-300 rounded-full w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-700 placeholder-gray-500"
            required
          />
          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Render the success popup */}
      {isSuccessPopupOpen && (
        <SubscriptionSuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={() => setIsSuccessPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default Subscribe;
