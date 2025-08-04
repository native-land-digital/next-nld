import "../globals.css";
import "../nld-styles.css";
import { getMessages } from '@/i18n/server-i18n';
import { GoogleAnalytics } from '@next/third-parties/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LocaleProvider } from '@/i18n/locale-provider';
import { HeaderSessionProvider } from '@/lib/auth/session-provider'
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

  return (
    <html lang={locale}>
      <body className="antialiased nld-font-noto">
        <LocaleProvider messages={messages}>
          <div>
            <HeaderSessionProvider>
              <Header />
            </HeaderSessionProvider>
            <div>
              {children}
            </div>
            <Footer />
            <ToastContainer />
          </div>
        </LocaleProvider>
        <GoogleAnalytics gaId="UA-61451694-1" />
      </body>
    </html>
  );
}
