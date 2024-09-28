import { headers } from "next/headers";
import Link from 'next/link'

export default function SubHeader({ title }) {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const locale = headerList.get("x-current-lang");

  let pathWithoutLocale = pathname.replace(`/${locale}/`, '/').replace('/', '');
  let splitPath = pathWithoutLocale.split('/')

  return (
    <div className="bg-blue-900 h-60 flex items-center py-6 px-10 md:px-0">
      <div className="w-full md:w-2/3 m-auto capitalize">
        <h2 className="font-semibold text-3xl">{title}</h2>
        <div className="text-sm mt-1.5">
          <Link className="text-white hover:text-slate-300" href="/">Home</Link>
          {splitPath.map(path => {
            return (
              <span key={`crumb-${path}`}>
                <span className="ml-2 mr-2">/</span>
                <Link className="capitalize text-white hover:text-slate-300" href={pathname.slice(0, pathname.indexOf(`/${path}`) + path.length + 1)}>
                  {decodeURIComponent(path.replace(/-/g, ' '))}
                </Link>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  );
}
