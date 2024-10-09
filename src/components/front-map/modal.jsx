'use client';
import { useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';

export default function MapModal() {

  const t = useTranslations('DisclaimerModal');

  const [ modalOpen, setModalOpen ] = useState(true);

  return (
    <div className={`${modalOpen ? 'opacity-100' : 'opacity-0 hidden'} front-page-modal bg-gray-700/40 h-full w-full size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none`} role="dialog" tabIndex="-1">
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3 id="hs-basic-modal-label" className="font-bold text-gray-800">
              {t('disclaimer-header')}
            </h3>
            <button onClick={() => setModalOpen(false)} type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <div className="text-black" dangerouslySetInnerHTML={{ __html : t('disclaimer')}} />
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button onClick={() => setModalOpen(false)} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            {t('disclaimer-close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
