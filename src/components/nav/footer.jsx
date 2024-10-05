import Image from "next/image";
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function Footer() {

  const t = await getTranslations('Navigation');

  return (
    <footer className="w-full bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 504 504" width="60px" height="60px">
                <g><path fill="#fefefe" d="M -0.5,-0.5 C 167.5,-0.5 335.5,-0.5 503.5,-0.5C 503.5,167.5 503.5,335.5 503.5,503.5C 335.5,503.5 167.5,503.5 -0.5,503.5C -0.5,335.5 -0.5,167.5 -0.5,-0.5 Z"/></g>
                <g><path fill="#474955" d="M 237.5,382.5 C 236.306,381.223 234.64,380.556 232.5,380.5C 230.631,380.507 228.964,380.84 227.5,381.5C 201.487,382.501 176.487,388.001 152.5,398C 147.107,400.726 142.274,404.226 138,408.5C 136.517,411.702 136.183,415.036 137,418.5C 143.503,426.313 151.669,431.813 161.5,435C 198.254,446.909 235.92,451.243 274.5,448C 302.141,446.742 328.474,440.408 353.5,429C 359.788,425.881 364.121,421.048 366.5,414.5C 364.121,407.952 359.788,403.119 353.5,400C 334.192,390.756 313.859,385.089 292.5,383C 295.294,377.912 297.961,372.745 300.5,367.5C 327.734,368.522 352.4,377.022 374.5,393C 387.759,407.335 387.759,421.668 374.5,436C 358.099,448.037 339.766,456.037 319.5,460C 267.085,470.102 215.085,468.436 163.5,455C 147.719,450.53 134.219,442.363 123,430.5C 115.571,416.308 117.405,403.475 128.5,392C 148.092,378.575 169.759,370.242 193.5,367C 204.768,365.128 216.102,363.961 227.5,363.5C 201.166,307.831 173.999,252.497 146,197.5C 125.741,141.974 138.241,95.4744 183.5,58C 224.24,31.5327 266.24,29.5327 309.5,52C 340.732,71.2563 359.232,99.0896 365,135.5C 367.097,154.313 365.097,172.646 359,190.5C 323.225,263.716 287.225,336.716 251,409.5C 246.487,400.473 241.987,391.473 237.5,382.5 Z"/></g>
                <g><path fill="#fdfdfd" d="M 243.5,88.5 C 272.254,87.1119 290.754,100.112 299,127.5C 301.985,155.706 290.151,174.539 263.5,184C 233.632,188.77 213.799,176.937 204,148.5C 199.905,117.002 213.072,97.0018 243.5,88.5 Z"/></g>
                <g><path fill="#adb1b4" d="M 227.5,381.5 C 228.964,380.84 230.631,380.507 232.5,380.5C 234.64,380.556 236.306,381.223 237.5,382.5C 234.272,381.586 230.939,381.253 227.5,381.5 Z"/></g>
              </svg>
              <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">{t('about-blurb')}</p>
              <Link prefetch={false} href="/contact"  className="py-2.5 px-5 h-9 block w-fit bg-indigo-600 rounded-full shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-indigo-700 lg:mx-0">
                {t('contact')}
              </Link>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">{t('about')}</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-3">
                <Link prefetch={false} href="/about/our-team" className="text-gray-600 hover:text-gray-900">{t('our-team')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/about/why-it-matters" className="text-gray-600 hover:text-gray-900">{t('why-it-matters')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/about/how-it-works" className="text-gray-600 hover:text-gray-900">{t('how-it-works')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/about/partners-and-contributors" className="text-gray-600 hover:text-gray-900">{t('partners-contributors')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/about/roadmap" className="text-gray-600 hover:text-gray-900">{t('roadmap')}</Link>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">{t('media')}</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-3">
                <a href="https://medium.com/@native-land" className="text-gray-600 hover:text-gray-900">{t('community-blog')}</a>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/media/media-coverage" className="text-gray-600 hover:text-gray-900">{t('media-coverage')}</Link>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">{t('contribute')}</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-3">
                <Link prefetch={false} href="/how-to-contribute/jobs" className="text-gray-600 hover:text-gray-900">{t('jobs')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/how-to-contribute/volunteer" className="text-gray-600 hover:text-gray-900">{t('volunteer')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/how-to-contribute/fixes-and-adding-maps" className="text-gray-600 hover:text-gray-900">{t('fixes-adding-maps')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/how-to-contribute/languages" className="text-gray-600 hover:text-gray-900">{t('translations')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/support/supporters-circle" className="text-gray-600 hover:text-gray-900">{t('supporters-circle')}</Link>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">{t('resources')}</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-3">
                <Link prefetch={false} href="/resources/territory-acknowledgement" className="text-gray-600 hover:text-gray-900">{t('territory-acknowledgement')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/resources/teachers-guide" className="text-gray-600 hover:text-gray-900">{t('teachers-guide')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/resources/mobile-apps" className="text-gray-600 hover:text-gray-900">{t('mobile-apps')}</Link>
              </li>
              <li className="mb-3">
                <a href="https://api-docs.native-land.ca" className="text-gray-600 hover:text-gray-900">{t('api')}</a>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/maps" className="text-gray-600 hover:text-gray-900">{t('all-maps')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/resources/territories-list" className="text-gray-600 hover:text-gray-900">{t('territories-list')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/resources/languages-list" className="text-gray-600 hover:text-gray-900">{t('languages-list')}</Link>
              </li>
              <li className="mb-3">
                <Link prefetch={false} href="/resources/treaties-list" className="text-gray-600 hover:text-gray-900">{t('treaties-list')}</Link>
              </li>
            </ul>
          </div>
      </div>
      <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500">©<Link className="ml-1" href="https://native-land.ca/">{t('native-land')}</Link> {t('copyright')}</span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <Link prefetch={false} href="/auth/login" className="text-gray-600 justify-self-center self-center hover:text-gray-900">{t('login')}</Link>
              <a href="https://www.facebook.com/nativelandnet/"  className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#FFF" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/nativelandnet/"  className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                <svg className="w-[1.25rem] h-[1.125rem] text-white" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.70975 7.93663C4.70975 6.65824 5.76102 5.62163 7.0582 5.62163C8.35537 5.62163 9.40721 6.65824 9.40721 7.93663C9.40721 9.21502 8.35537 10.2516 7.0582 10.2516C5.76102 10.2516 4.70975 9.21502 4.70975 7.93663ZM3.43991 7.93663C3.43991 9.90608 5.05982 11.5025 7.0582 11.5025C9.05658 11.5025 10.6765 9.90608 10.6765 7.93663C10.6765 5.96719 9.05658 4.37074 7.0582 4.37074C5.05982 4.37074 3.43991 5.96719 3.43991 7.93663ZM9.97414 4.22935C9.97408 4.39417 10.0236 4.55531 10.1165 4.69239C10.2093 4.82946 10.3413 4.93633 10.4958 4.99946C10.6503 5.06259 10.8203 5.07916 10.9844 5.04707C11.1484 5.01498 11.2991 4.93568 11.4174 4.81918C11.5357 4.70268 11.6163 4.55423 11.649 4.39259C11.6817 4.23095 11.665 4.06339 11.6011 3.91109C11.5371 3.7588 11.4288 3.6286 11.2898 3.53698C11.1508 3.44536 10.9873 3.39642 10.8201 3.39635H10.8197C10.5955 3.39646 10.3806 3.48424 10.222 3.64043C10.0635 3.79661 9.97434 4.00843 9.97414 4.22935ZM4.21142 13.5892C3.52442 13.5584 3.15101 13.4456 2.90286 13.3504C2.57387 13.2241 2.33914 13.0738 2.09235 12.8309C1.84555 12.588 1.69278 12.3569 1.56527 12.0327C1.46854 11.7882 1.3541 11.4201 1.32287 10.7431C1.28871 10.0111 1.28189 9.79119 1.28189 7.93669C1.28189 6.08219 1.28927 5.86291 1.32287 5.1303C1.35416 4.45324 1.46944 4.08585 1.56527 3.84069C1.69335 3.51647 1.84589 3.28513 2.09235 3.04191C2.3388 2.79869 2.57331 2.64813 2.90286 2.52247C3.1509 2.42713 3.52442 2.31435 4.21142 2.28358C4.95417 2.24991 5.17729 2.24319 7.0582 2.24319C8.9391 2.24319 9.16244 2.25047 9.90582 2.28358C10.5928 2.31441 10.9656 2.42802 11.2144 2.52247C11.5434 2.64813 11.7781 2.79902 12.0249 3.04191C12.2717 3.2848 12.4239 3.51647 12.552 3.84069C12.6487 4.08513 12.7631 4.45324 12.7944 5.1303C12.8285 5.86291 12.8354 6.08219 12.8354 7.93669C12.8354 9.79119 12.8285 10.0105 12.7944 10.7431C12.7631 11.4201 12.6481 11.7881 12.552 12.0327C12.4239 12.3569 12.2714 12.5882 12.0249 12.8309C11.7784 13.0736 11.5434 13.2241 11.2144 13.3504C10.9663 13.4457 10.5928 13.5585 9.90582 13.5892C9.16306 13.6229 8.93994 13.6296 7.0582 13.6296C5.17645 13.6296 4.95395 13.6229 4.21142 13.5892ZM4.15307 1.03424C3.40294 1.06791 2.89035 1.18513 2.4427 1.3568C1.9791 1.53408 1.58663 1.77191 1.19446 2.1578C0.802277 2.54369 0.56157 2.93108 0.381687 3.38797C0.207498 3.82941 0.0885535 4.3343 0.0543922 5.07358C0.0196672 5.81402 0.0117188 6.05074 0.0117188 7.93663C0.0117188 9.82252 0.0196672 10.0592 0.0543922 10.7997C0.0885535 11.539 0.207498 12.0439 0.381687 12.4853C0.56157 12.9419 0.802334 13.3297 1.19446 13.7155C1.58658 14.1012 1.9791 14.3387 2.4427 14.5165C2.89119 14.6881 3.40294 14.8054 4.15307 14.839C4.90479 14.8727 5.1446 14.8811 7.0582 14.8811C8.9718 14.8811 9.212 14.8732 9.96332 14.839C10.7135 14.8054 11.2258 14.6881 11.6737 14.5165C12.137 14.3387 12.5298 14.1014 12.9219 13.7155C13.3141 13.3296 13.5543 12.9419 13.7347 12.4853C13.9089 12.0439 14.0284 11.539 14.062 10.7997C14.0962 10.0587 14.1041 9.82252 14.1041 7.93663C14.1041 6.05074 14.0962 5.81402 14.062 5.07358C14.0278 4.33424 13.9089 3.82913 13.7347 3.38797C13.5543 2.93135 13.3135 2.5443 12.9219 2.1578C12.5304 1.7713 12.137 1.53408 11.6743 1.3568C11.2258 1.18513 10.7135 1.06735 9.96388 1.03424C9.21256 1.00058 8.97236 0.992188 7.05876 0.992188C5.14516 0.992188 4.90479 1.00002 4.15307 1.03424Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/native-land-digital"  className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                <svg className="w-[1rem] h-[1rem] text-white" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.8794 11.5527V3.86835H0.318893V11.5527H2.87967H2.8794ZM1.59968 2.81936C2.4924 2.81936 3.04817 2.2293 3.04817 1.49188C3.03146 0.737661 2.4924 0.164062 1.61666 0.164062C0.74032 0.164062 0.167969 0.737661 0.167969 1.49181C0.167969 2.22923 0.723543 2.8193 1.5829 2.8193H1.59948L1.59968 2.81936ZM4.29668 11.5527H6.85698V7.26187C6.85698 7.03251 6.87369 6.80255 6.94134 6.63873C7.12635 6.17968 7.54764 5.70449 8.25514 5.70449C9.18141 5.70449 9.55217 6.4091 9.55217 7.44222V11.5527H12.1124V7.14672C12.1124 4.78652 10.8494 3.68819 9.16483 3.68819C7.78372 3.68819 7.17715 4.45822 6.84014 4.98267H6.85718V3.86862H4.29681C4.33023 4.5895 4.29661 11.553 4.29661 11.553L4.29668 11.5527Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
