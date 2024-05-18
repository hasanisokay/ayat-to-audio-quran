import { Roboto } from "next/font/google";
import "./globals.css";

import localFont from 'next/font/local'

const inter = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '700'],
})

const myFont = localFont({
  src: "./../../public/assets/font/noorehuda.ttf",
  display: 'swap',
  variable: '--font-noorehuda',
  
})

export const metadata = {
  title: "Ayat To PDF",
  description: "A free quran project by Hasan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${myFont.variable}`}>{children}</body>
    </html>
  );
}
