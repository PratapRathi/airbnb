import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import ToasterProvider from "@/app/providers/ToasterProvider";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import Navbar from "@/app/components/navbar/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Airbnb | Holiday rentals, cabins, beach houses & more",
  description: "Holiday rentals, Cabins, beach, house & more",
  icons: { icon: "/favicon_airbnb.png" }
};

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Suspense>
          <SearchModal />
        </Suspense>
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
