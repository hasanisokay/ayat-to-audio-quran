import { Roboto } from "next/font/google";
import "./globals.css";
import Nurehuda from '@/../assets/font/noorehuda.ttf';

const inter = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '700'],
})
 
// const nurehuda_font = Nurehuda({
//   display: 'swap',
//   variable: '--font-nurehuda',
// })

export const metadata = {
  title: "Ayat To PDF",
  description: "A free quran project by Hasan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>{children}</body>
    </html>
  );
}
