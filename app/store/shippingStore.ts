import { persist } from 'zustand/middleware';
import { create } from "zustand";



type ShippingDetails = {
  name: string;
  phoneNumber: string;
  phoneCountryCode: string;
  email: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postcode: string;
};


type ShippingStoreState = {
  shippingData: ShippingDetails;
  updateShippingData: (data: ShippingDetails) => void;
};

const useShippingStore = create(
  persist<ShippingStoreState>(
    (set) => ({
      shippingData: {
        name: "",
        phoneNumber: "",
        phoneCountryCode: "",
        email: "",
        country: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        postcode: "",
      },
      updateShippingData: (data: ShippingDetails) => set({ shippingData: data }),
    }),
    {
      name: "shipping-data",
    }
  )
);

export default useShippingStore;