import { useState } from "react";
import useCartStore from "@/app/store/cartStore";
import { useRouter } from "next/navigation";
import ShippingAddressForm from "./ShippingAddressForm";
import useShippingStore from "@/app/store/shippingStore";

const Cart = () => {
  const cart = useCartStore((state: any) => state.cart);
  const removeFromCart = useCartStore((state: any) => state.removeFromCart);
  const clearCart = useCartStore((state: any) => state.clearCart);
  const router = useRouter(); // Initialize the router
  const shippingData = useShippingStore((state) => state.shippingData);

  // State to store additional order-wide instructions
  const [orderInstructions, setOrderInstructions] = useState("");

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  };

  // Handle checkout process
  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      console.error("Cart is empty or undefined");
      return;
    }

    try {
      const cartItemsForCheckout = cart.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        sku: item.sku || "N/A",
        size: item.size,
        measurements: item.measurements || {},
        additionalInstructions: item.additionalInstructions || "N/A",
      }));

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cartItemsForCheckout,
          orderInstructions: orderInstructions.slice(0, 500) || "N/A",
          shippingData,
          totalAmount:calculateTotal()
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error creating checkout session:", data.error);
      }
    } catch (err) {
      console.error("Error proceeding to checkout:", err);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Cart
      </h1>

      {cart.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12">
          <section aria-labelledby="cart-heading" className="lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul className="divide-y divide-gray-200 space-y-6">
              {cart.map((item: any) => (
                <li
                  key={`${item.id}-${item.size}`}
                  className="flex items-center"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.imageSrc || "/placeholder.jpg"}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="ml-4 flex-1 sm:ml-6">
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <strong>Size:</strong> {item.size}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      <strong>SKU:</strong> {item.sku || "N/A"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      <strong>Quantity:</strong> {item.quantity || "N/A"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      <strong>Measurements:</strong>{" "}
                      {item.measurements
                        ? Object.entries(item.measurements)
                            .map(([key, value]) => `${key}: ${value || "N/A"}`)
                            .join(", ")
                        : "N/A"}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      AED {item.price.toFixed(2)}
                    </p>
                    <div>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>
              <dl className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    AED {calculateTotal().toFixed(2)}
                  </dd>
                </div>
              </dl>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Order Instructions
                </label>
                <textarea
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter any special requests or additional information..."
                  value={orderInstructions}
                  onChange={(e) => setOrderInstructions(e.target.value)}
                />
              </div>

              <section className="lg:col-span-12 mt-8">
                <ShippingAddressForm />
              </section>

              <button
                type="button"
                className="mt-6 w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium shadow hover:bg-indigo-700"
                onClick={handleCheckout}
              >
                Proceed to Payment
              </button>
            </div>
          </section>
        </div>
      ) : (
        <p className="mt-20">Your cart is empty.</p>
      )}
    </main>
  );
};

export default Cart;
