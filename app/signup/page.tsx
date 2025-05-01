"use client";

import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";
import SignupForm from "../ui/auth/signup";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow mt-20 mb-20">
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
}
