"use client";

import React from "react";
import CheckoutComponent from "../ui/checkout/checkout";
import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";

const CartPage = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow mt-20">
          <CheckoutComponent />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
