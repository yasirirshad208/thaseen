import React from "react";
import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";
import TermsAndConditions from "../ui/policies/terms-and-conditions";

export default function HomePage() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <TermsAndConditions />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
