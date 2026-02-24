import "../nld-styles.css";
import "../globals.css";
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
            <div className="absolute z-[10] w-full lg:rounded-b-xl lg:w-1/2 lg:ml-[25%] bg-red-100 text-center text-xs p-2 text-gray-800">
              NLD maps are not official sources. <span className="underline text-blue-500">Learn what we are mapping</span>.
            </div>
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
