import React from "react";
import useCartStore from "@/app/store/cartStore";
import useShippingStore from "@/app/store/shippingStore";

const OrderSummary: React.FC = () => {
  // Fetching cart and shipping details from the store
  const cart = useCartStore((state) => state.cart);
  const shippingDetails = useShippingStore((state) => state.shippingData);
  const orderInstructions = useCartStore((state) => state.orderInstructions);

  console.log("Shipping Details at OrderSummary:", shippingDetails);

  // Calculating the total price of the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handling potential undefined data
  if (!shippingDetails) {
    return <p>Loading shipping details...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h1 className="text-xl font-semibold">Order Summary</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="my-4">
            {cart.map((item, index) => (
              <li key={index} className="border-b last:border-b-0 py-2">
                {item.name} - Qty: {item.quantity} - Price: $
                {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Shipping Details</h2>
        <p>Name: {shippingDetails.name}</p>
        <p>
          Phone: {shippingDetails.phoneCountryCode}{" "}
          {shippingDetails.phoneNumber}
        </p>
        <p>Email: {shippingDetails.email}</p>
        <p>
          Address: {shippingDetails.addressLine1},{" "}
          {shippingDetails.addressLine2}
        </p>
        <p>City: {shippingDetails.city}</p>
        <p>Country: {shippingDetails.country}</p>
        <p>Postcode: {shippingDetails.postcode}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Special Instructions</h2>
        <p>{orderInstructions || "No special instructions provided."}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
