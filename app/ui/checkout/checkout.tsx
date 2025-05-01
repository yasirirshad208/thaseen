"use client";

import { useState } from "react";
import useCartStore from "@/app/store/cartStore";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);
const countryOptions = Object.entries(countries.getNames("en")).map(
  ([code, name]) => ({
    code,
    name,
  })
);

export default function CheckoutComponent() {
  const cart = useCartStore((state: any) => state.cart);
  const calculateTotal = () => {
    return cart.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("US");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhoneChange = (phone: string | undefined) => {
    setForm({ ...form, phoneNumber: phone || "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/dhlProxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postalCode: form.postalCode,
          city: form.city,
          countryCode: form.country,
        }),
      });

      const data = await response.json();
      if (response.ok && data.validatedAddress) {
        console.log("Address validated:", data.validatedAddress);
        alert("Address validated successfully!");
      } else {
        alert("Invalid address. Please check your details.");
      }
    } catch (error) {
      console.error("DHL Validation Error:", error);
      alert("Error validating address. Try again later.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 px-6 sm:px-8 py-12">
        <section className="lg:col-span-5 bg-indigo-900 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {cart.length ? (
            <ul className="space-y-4">
              {cart.map((item: any) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between space-x-4"
                >
                  <div className="flex space-x-4">
                    <img
                      src={item.imageSrc || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p>{item.color || "No color specified"}</p>
                      <p>{item.size || "No size specified"}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="mt-6 text-sm">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>${calculateTotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p>$25.00</p>
            </div>
            <div className="flex justify-between">
              <p>Taxes:</p>
              <p>$47.60</p>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <p>Total:</p>
              <p>${(calculateTotal() + 25 + 47.6).toFixed(2)}</p>
            </div>
          </div>
        </section>

        <section className="lg:col-span-7 bg-white p-6 rounded-lg shadow-lg mt-8 lg:mt-0">
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-3 border rounded-md"
              />
            </div>
            <PhoneInput
              international
              defaultCountry="AE"
              value={form.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Phone Number"
              className="w-full p-3 border rounded-md mt-4"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border rounded-md mt-4"
            />

            <h3 className="text-lg font-semibold mb-4 text-gray-900 mt-6">
              Shipping Address
            </h3>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street Address"
              className="w-full p-3 border rounded-md mb-4"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State / Province"
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="w-full p-3 border rounded-md"
              />
            </div>
            <select
              name="country"
              value={form.country}
              onChange={(e) => {
                handleChange(e);
                setSelectedCountry(e.target.value.toLowerCase());
              }}
              className="w-full p-3 border rounded-md mt-4"
            >
              <option value="">Select Country</option>
              {countryOptions.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md mt-6 hover:bg-indigo-700"
            >
              Submit Shipping Details
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
