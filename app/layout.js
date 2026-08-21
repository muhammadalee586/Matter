import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SessionWrapper from "@/components/layout/SessionWrapper";
import Navbar from "@/components/layout/Navbar";
import { ToastProvider } from "@/context/ToastContext";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "Matter",
  description: "A full-stack e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-stone text-ink">
        <SessionWrapper>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </ToastProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}