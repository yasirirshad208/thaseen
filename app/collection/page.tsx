"use client";

import NavBar from "../ui/home/navbar/mainnavbar";
import CollectionComponent from "../ui/collections/eveningwear";
import Footer from "../ui/home/footer/footer";

export default function Page() {
  return (
    <div>
      <NavBar />
      <CollectionComponent />
      <Footer />
    </div>
  );
}
