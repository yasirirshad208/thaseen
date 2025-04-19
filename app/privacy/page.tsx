import React from "react";
import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";
import PrivacyPolicy from "../ui/policies/privacy-policy";

export default function HomePage() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <PrivacyPolicy />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
