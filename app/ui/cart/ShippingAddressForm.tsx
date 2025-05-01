import React, { useState, useEffect } from "react";
import useShippingStore from "@/app/store/shippingStore";

interface ShippingFormState {
  name: string;
  phoneNumber: string;
  phoneCountryCode: string;
  email: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postcode: string;
}

interface CountryData {
  name: string;
  code: string;
  dialCode: string;
}

const ShippingAddressForm: React.FC = () => {
  const { shippingData, updateShippingData } = useShippingStore();

  const [countries, setCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const formattedCountries = data.map((country: any) => ({
        name: country.name.common,
        code: country.cca2,
        dialCode:
          country.idd.root +
          (country.idd.suffixes ? country.idd.suffixes[0] : ""),
      }));
      setCountries(
        formattedCountries.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        )
      );
    };

    fetchCountries();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    // Update the local form data and the Zustand store
    updateShippingData({ ...shippingData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Shipping Data Updated:", shippingData);
  };

  return (
    <div className=" px-6 py-12 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl text-black">Shipping Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={shippingData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black"
            required
          />
          <div className="grid grid-cols-3 gap-4">
            <select
              name="phoneCountryCode"
              value={shippingData.phoneCountryCode}
              onChange={handleChange}
              className="col-span-1 block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black"
              required
            >
              <option value="">Code</option>
              {countries.map((country) => (
                <option key={country.code} value={country.dialCode}>
                  {country.dialCode} ({country.name})
                </option>
              ))}
            </select>
            <input
              type="text"
              name="phoneNumber"
              value={shippingData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="col-span-2 block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            value={shippingData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black"
            required
          />
          <select
            name="country"
            value={shippingData.country}
            onChange={handleChange}
            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black"
            required
          >
            <option value="">Select a Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="city"
            value={shippingData.city}
            onChange={handleChange}
            placeholder="City"
            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black"
            required
          />
          <input
            type="text"
            name="addressLine1"
            value={shippingData.addressLine1}
            onChange={handleChange}
            placeholder="Address Line 1"
            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black"
            required
          />
          <input
            type="text"
            name="addressLine2"
            value={shippingData.addressLine2}
            onChange={handleChange}
            placeholder="Address Line 2"
            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black"
          />
          <input
            type="text"
            name="postcode"
            value={shippingData.postcode}
            onChange={handleChange}
            placeholder="Postcode"
            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressForm;
