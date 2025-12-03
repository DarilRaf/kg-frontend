import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google"; 
import "./globals.css";

// Font untuk teks isi 
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Font untuk Judul Utama (Curator branding)
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

// Font untuk detail artistik
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant"
});

export const metadata: Metadata = {
  title: "Curator | Historical Art Archive",
  description: "A curated journey through art history from the 3rd to 19th century.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} bg-stone-50 text-stone-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}