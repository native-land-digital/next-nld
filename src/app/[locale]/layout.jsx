import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/nav/header';
import Footer from '@/components/nav/footer';

export const metadata = {
  title: "Native-Land.ca | Our home on native land",
  description: "Native Land is a resource to learn more about Indigenous territories, languages, lands, and ways of life. We welcome you to our site.",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }]
}

export default async function RootLayout({children, params: { locale } }) {

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <div>
            <Header />
            <div>
              {children}
            </div>
            <Footer />
            <ToastContainer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
