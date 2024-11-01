'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from '@/i18n/client-i18n';

import WYSIWYGEDitor from '@/components/dashboard/editors/wysiwyg-editor';

export default function CreateIssue() {

  const t = useTranslations('Dashboard');
  const router = useRouter();

  const [ modalOpen, setModalOpen ] = useState(false);
  const [ name, setName ] = useState("");
  const [ comment, setComment ] = useState("")
  const [ categories, setCategories ] = useState([])

  const makeNewIssue = () => {
    fetch('/api/issue', {
      method : "POST",
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        name : name,
        comment : comment,
        categories : categories
      })
    }).then(resp => resp.json()).then(results => {
      if(results.error) {
        toast(results.error)
      } else {
        toast(t('issue-created'))
        setModalOpen(false)
        router.refresh();
      }
    });
  }

  return (
    <>
      <button type="button" onClick={() => setModalOpen(true)} className="py-3 px-4 gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
        {t('create-new-issue')}
      </button>

      <div className={`${modalOpen ? 'opacity-100' : 'opacity-0 hidden'} front-page-modal bg-gray-700/40 h-full w-full size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none`} role="dialog" tabIndex="-1">
        <div className="sm:w-1/2 m-3 mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 id="hs-basic-modal-label" className="font-bold text-gray-800">
                {t('create-new-issue')}
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
              <div className="w-full">
                <div className="mt-2.5">
                  <label className="text-gray-800 text-sm mb-1 block">{t('name')}</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('name-placeholder')} />
                </div>
              </div>
              <div className="w-full">
                <div className="mt-2.5">
                  <label className="text-gray-800 text-sm mb-1 block">{t('comment')}</label>
                  <WYSIWYGEDitor sources={comment} setSources={setComment} />
                </div>
              </div>

            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button onClick={() => makeNewIssue()} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-blue-600 text-white shadow-sm hover:bg-blue-700">
                {t('create-new-issue')}
              </button>
              <button onClick={() => setModalOpen(false)} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
