import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/nav/header';
// import Footer from '@/components/nav/footer';
import { getDictionary } from '@/i18n/dictionaries';

export const metadata = {
  title: "Native-Land.ca | Our home on native land",
  description: "Native Land is a resource to learn more about Indigenous territories, languages, lands, and ways of life. We welcome you to our site.",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }]
}

export default async function RootLayout({children, params: { lang } }) {

  const dict = await getDictionary(lang, 'nav');

  return (
    <html lang={lang}>
      <body className="antialiased">
        <Header dict={dict} />
        <div>
          {children}
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
// <Footer dict={dict} />
