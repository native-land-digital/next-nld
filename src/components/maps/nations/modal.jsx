'use client';
import { useTranslations } from '@/i18n/client-i18n';

export default function MapModal({ setModalOpen, modalOpen, headerText, bodyText, footerText }) {

  const t = useTranslations('DisclaimerModal');

  return (
    <div className={`${modalOpen ? 'opacity-100' : 'opacity-0 hidden'} front-page-modal h-full w-full size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none`} role="dialog" tabIndex="-1">
      <div className="sm:max-w-2xl sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col nld-bg-teal-50 shadow-sm rounded-xl pointer-events-auto p-4">
          <div className="flex justify-between items-center py-3 px-4">
              <div className="flex items-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1875 23.5C18.1875 23.7486 18.0887 23.9871 17.9129 24.1629C17.7371 24.3387 17.4986 24.4375 17.25 24.4375C16.6698 24.4375 16.1134 24.207 15.7032 23.7968C15.293 23.3866 15.0625 22.8302 15.0625 22.25V16C15.0625 15.9171 15.0296 15.8376 14.971 15.779C14.9124 15.7204 14.8329 15.6875 14.75 15.6875C14.5014 15.6875 14.2629 15.5887 14.0871 15.4129C13.9113 15.2371 13.8125 14.9986 13.8125 14.75C13.8125 14.5014 13.9113 14.2629 14.0871 14.0871C14.2629 13.9113 14.5014 13.8125 14.75 13.8125C15.3302 13.8125 15.8866 14.043 16.2968 14.4532C16.707 14.8634 16.9375 15.4198 16.9375 16V22.25C16.9375 22.3329 16.9704 22.4124 17.029 22.471C17.0876 22.5296 17.1671 22.5625 17.25 22.5625C17.4986 22.5625 17.7371 22.6613 17.9129 22.8371C18.0887 23.0129 18.1875 23.2514 18.1875 23.5ZM15.375 10.6875C15.684 10.6875 15.9861 10.5959 16.2431 10.4242C16.5 10.2525 16.7003 10.0085 16.8186 9.72294C16.9368 9.43743 16.9678 9.12327 16.9075 8.82017C16.8472 8.51707 16.6984 8.23866 16.4799 8.02014C16.2613 7.80163 15.9829 7.65281 15.6798 7.59252C15.3767 7.53223 15.0626 7.56318 14.7771 7.68144C14.4916 7.7997 14.2475 7.99997 14.0758 8.25692C13.9041 8.51387 13.8125 8.81597 13.8125 9.125C13.8125 9.5394 13.9771 9.93683 14.2702 10.2299C14.5632 10.5229 14.9606 10.6875 15.375 10.6875ZM31.9375 16C31.9375 19.1521 31.0028 22.2335 29.2516 24.8544C27.5003 27.4753 25.0112 29.5181 22.099 30.7243C19.1868 31.9306 15.9823 32.2462 12.8908 31.6313C9.79918 31.0163 6.95939 29.4984 4.73049 27.2695C2.50159 25.0406 0.983694 22.2008 0.368742 19.1093C-0.24621 16.0177 0.0694052 12.8132 1.27568 9.90098C2.48195 6.98879 4.5247 4.49969 7.14561 2.74845C9.76651 0.997218 12.8479 0.0625 16 0.0625C20.2254 0.0674623 24.2763 1.74818 27.264 4.73597C30.2518 7.72375 31.9325 11.7746 31.9375 16ZM30.0625 16C30.0625 13.2187 29.2378 10.4999 27.6925 8.18729C26.1473 5.87473 23.9511 4.0723 21.3815 3.00794C18.8119 1.94359 15.9844 1.6651 13.2565 2.20771C10.5287 2.75031 8.02299 4.08963 6.05632 6.05631C4.08964 8.02299 2.75032 10.5287 2.20771 13.2565C1.66511 15.9844 1.94359 18.8119 3.00795 21.3815C4.07231 23.9511 5.87473 26.1473 8.1873 27.6925C10.4999 29.2377 13.2187 30.0625 16 30.0625C19.7283 30.0584 23.3028 28.5755 25.9391 25.9391C28.5755 23.3028 30.0584 19.7283 30.0625 16Z" fill="#237575"/>
                </svg>
                <h3 id="hs-basic-modal-label" className="ml-4 nld-font-h2 nld-font-jost nld-text-teal-500">
                  {t(headerText) ? t(headerText) : headerText}
                </h3>
              </div>
            <button onClick={() => setModalOpen(false)} type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <div className="nld-text-md nld-text-grey-500" dangerouslySetInnerHTML={{ __html : t(bodyText) ? t(bodyText) : bodyText}} />
          </div>
          <div className="flex justify-center items-center gap-x-2 py-3 px-4">
            <button onClick={() => setModalOpen(false)} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 nld-text-sm font-medium rounded-full nld-bg-green-500 nld-text-grey-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
            {t(footerText) ? t(footerText) : footerText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
