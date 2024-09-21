import type { Metadata } from "next";
import "./globals.css";

import Header from '@/components/nav/header';
import Footer from '@/components/nav/footer';

export const metadata: Metadata = {
  title: "Native-Land.ca | Our home on native land",
  description: "Native Land is a resource to learn more about Indigenous territories, languages, lands, and ways of life. We welcome you to our site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
