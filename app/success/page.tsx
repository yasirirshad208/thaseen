"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";
import useCartStore from "../store/cartStore";
import useShippingStore from "../store/shippingStore";

export default function SuccessPage() {
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>(
    "Verifying your payment..."
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const sessionId = queryParams.get("session_id"); 
      setPaymentIntentId(sessionId  ?? "");

      if (sessionId) {
        verifyPayment(sessionId);
      }
    }
  }, []);

  const verifyPayment = async (paymentIntentId: string) => {
    try {
      const response = await fetch("/api/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId:paymentIntentId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      
      if (data.success) {
        setPaymentStatus(
          `Hi ${data.order.shippingData.name}, Your payment was successfully verified. You’ll receive a confirmation email shortly.`
        );
        setOrderId(`T-${data.order.orderId}`)
      } else {
        setPaymentStatus(`Payment verification failed: ${data.message}`);
      }
    } catch (error) {
      setPaymentStatus("Error verifying payment. Please contact support.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="text-center my-20">
        <h1 className="text-3xl font-bold">Thank you for your order!</h1>
        <p className="mt-4">{paymentStatus}</p>
        {orderId &&(
          <p className="mt-4">Your Order no is {orderId}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
