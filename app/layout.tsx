import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import { Toaster } from "react-hot-toast";
import { AuthAdminProvider } from "@/context/AuthAdminContext";

// Local Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google Font: Nunito
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "THASEEN",
  description: "Fashion Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
        style={{ fontFamily: "var(--font-nunito), sans-serif" }}
      >
        <AdminProvider>
          <AuthAdminProvider>
        {/* Children rendered without CartProvider as Zustand manages global state */}
        {children}
        </AuthAdminProvider>
        </AdminProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
          }}
          />
      </body>
    </html>
  );
}

/*


CHANGED TO USE ZUSTAND

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

// Local Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google Font: Nunito
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "THASEEN",
  description: "Fashion Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
        style={{ fontFamily: "var(--font-nunito), sans-serif" }}
      >
    
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}


*/
