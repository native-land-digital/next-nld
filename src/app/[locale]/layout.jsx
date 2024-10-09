import "./globals.css";
import { getMessages } from '@/i18n/server-i18n';
import { getServerSession } from "next-auth"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LocaleProvider } from '@/i18n/locale-provider';
import { authOptions } from "@/root/auth";
import Header from '@/components/nav/header';
import Footer from '@/components/nav/footer';

export const metadata = {
  metadataBase : new URL("https://native-land.ca"),
  applicationName : "Native-Land.ca",
  keywords: ['Indigenous', 'Mapping', 'Land back', 'Native', 'Territory', 'Languages', 'Treaties'],
  creator : "Victor Temprano",
  publisher : "Native Land Digital",
  title: "Native-Land.ca | Our home on native land",
  description: "Native Land is a resource to learn more about Indigenous territories, languages, lands, and ways of life. We welcome you to our site.",
  icons : {
    icon : '/images/favicon.ico'
  }
};

export function generateStaticParams() {
  return [{ locale : "en" }];
}

export default async function RootLayout({ children, params : { locale }}) {

  const messages = await getMessages(locale);
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <body className="antialiased">
        <LocaleProvider messages={messages}>
          <div>
            <Header session={session} />
            <div>
              {children}
            </div>
            <Footer />
            <ToastContainer />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
