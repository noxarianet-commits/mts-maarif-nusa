import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MTs Maarif NU Sragi - Website Resmi",
  description: "Website resmi MTs Maarif NU Sragi - Madrasah Tsanawiyah berkomitmen untuk pendidikan berkualitas dengan nilai-nilai Islam",
  keywords: ["MTs Maarif NU", "Sragi", "Madrasah", "Sekolah Islam", "Pendidikan"],
  authors: [{ name: "MTs Maarif NU Sragi" }],
  openGraph: {
    title: "MTs Maarif NU Sragi",
    description: "Website resmi MTs Maarif NU Sragi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
