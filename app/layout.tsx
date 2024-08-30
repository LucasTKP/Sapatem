import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/header/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Footer from "@/src/components/footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sapatem",
  description: "Onde o conforto encontra a elegância.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} bg-background text-background min-w-screen min-h-screen`}
      >
        <ToastContainer autoClose={3000} />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
