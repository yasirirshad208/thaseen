import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
  size: string;
  sku: string | null;
  measurements?: {
    shoulder: string;
    hips: string;
    bust: string;
    waist: string;
    lengthFromShoulderToFloor: string;
    sleeveLength: string;
  }; // Optional measurements for custom dresses
  additionalInstructions?: string; // Any additional instructions for a specific item
};

type CartState = {
  cart: CartItem[];
  orderInstructions: string;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateOrderInstructions: (instructions: string) => void;
  clearCart: () => void;
};

const useCartStore = create(
  persist<CartState>(
    (set) => ({
      cart: [],
      orderInstructions: "",

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (i) => i.id === item.id && i.size === item.size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { cart: [...state.cart, item] };
        }),

      removeFromCart: (id, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.id !== id || item.size !== size
          ),
        })),

      updateOrderInstructions: (instructions) =>
        set(() => ({
          orderInstructions: instructions,
        })),

      clearCart: () =>
        set(() => ({
          cart: [],
          orderInstructions: "",
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
