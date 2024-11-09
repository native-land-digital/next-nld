import "../../globals.css";
import { getMessages } from '@/i18n/server-i18n';
import { GoogleAnalytics } from '@next/third-parties/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HeaderSessionProvider } from '@/lib/auth/session-provider'
import { LocaleProvider } from '@/i18n/locale-provider';
import DashboardMenu from '@/components/nav/dashboard-menu';

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
      <body className="antialiased">
        <LocaleProvider messages={messages}>
          <div className="flex h-screen overflow-hidden">
            <DashboardMenu />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  <div className="col-span-2 bg-white rounded-t min-h-screen text-black">
                    <HeaderSessionProvider>
                      {children}
                    </HeaderSessionProvider>
                  </div>
                </div>
              </main>
            </div>
            <ToastContainer />
          </div>
        </LocaleProvider>
        <GoogleAnalytics gaId="UA-61451694-1" />
      </body>
    </html>
  );
}
