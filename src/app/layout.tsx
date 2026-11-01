import { Suspense } from "react";
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";

import "./globals.css";

import Navber from "@/components/Home/Navber";
import Footer from "@/components/Footer";
import { Bounce, ToastContainer } from "react-toastify";

// Premium Heading Font
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Modern Body Font
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "StudioSpace | Creative Studio Marketplace",
  description:
    "Discover and book inspiring creative studios for photography, podcasting, music, and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Suspense fallback={<div className="h-20" />}>
          <Navber />
        </Suspense>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
