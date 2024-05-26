import { Roboto } from "next/font/google";
import "./globals.css";

import localFont from 'next/font/local'

const inter = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '700'],
})
// const DancingScript = dancingScript({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-dancing-script',
//   weight: ['400', '700'],
// })

const myFont = localFont({
  src: "./../../public/assets/font/noorehuda.ttf",
  display: 'swap',
  variable: '--font-noorehuda',
  
})

export const metadata = {
  title: "Ayat To PDF",
  description: "A free Quran project by Hasan",
  author: "Hasan",
  keywords: ["Quran", "Ayat", "PDF", "Conversion", "Islamic Texts"],
  creationDate: "2024-05-26",
  modifiedDate: "2024-05-26",
};

export default function RootLayout({ children }) {
  const isClient = typeof window !== "undefined";
  if (!isClient) return;
  return (
    <html lang="en">
      <body className={`${inter.variable} ${myFont.variable} `}>{children}</body>
    </html>
  );
}
