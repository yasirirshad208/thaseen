"use client";

import AccountDashboard from "../ui/account/accountDashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../ui/home/navbar/mainnavbar";
import Footer from "../ui/home/footer/footer";

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <AccountDashboard />
      </div>
      <Footer />
    </div>
  );
}
