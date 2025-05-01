"use client";

import React from "react";
import Cart from "../ui/cart/cart";
import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";

const CartPage = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow mt-20">
          <Cart />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
