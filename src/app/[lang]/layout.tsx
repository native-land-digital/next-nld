import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/nav/header';
import Footer from '@/components/nav/footer';
import { getDictionary } from '@/i18n/dictionaries';

export const metadata: Metadata = {
  title: "Native-Land.ca | Our home on native land",
  description: "Native Land is a resource to learn more about Indigenous territories, languages, lands, and ways of life. We welcome you to our site.",
};

export default async function RootLayout({children, params: { lang } }) {

  const dict = await getDictionary(lang, 'nav');

  return (
    <html lang="en">
      <body className="antialiased">
        <Header dict={dict} />
        <div>
          {children}
        </div>
        <Footer dict={dict} />
        <ToastContainer />
      </body>
    </html>
  );
}
