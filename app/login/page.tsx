"use client";

import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";
import LoginForm from "../ui/auth/login";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow mt-20">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
