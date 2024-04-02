import {Nunito} from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Airbnb",
  description: "Holiday rentals, Cabins, beach, house & more",
  icons: {icon: "/favicon_airbnb.png"}
};

const font = Nunito({
  subsets: ["latin"]
})

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
