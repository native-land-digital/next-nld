'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from '@/i18n/client-i18n';

export default function CreatePolygon() {

  const t = useTranslations('Dashboard');
  const router = useRouter();

  const [ listOpen, setListOpen ] = useState(false);

  const makeNewEntry = (type) => {
    const name = window.prompt(t('enter-name'));
    if(name) {
      fetch('/api/entry', {
        method : "POST",
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify({
          name : name,
          type : type
        })
      }).then(resp => resp.json()).then(results => {
        if(results.error) {
          toast(results.error)
        } else {
          router.push(`/dashboard/research/${results.id}`);
        }
      });
    }
  }

  return (
    <>
      <button type="button" onClick={() => setListOpen(!listOpen)} className="py-3 px-4 gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
        {t('create-entry')}
      </button>
      {listOpen ?
        <>
          <div className="absolute transition-[opacity,margin] duration bg-white shadow rounded mt-2 w-36">
            <button type="button" className="block py-3 px-4 w-full hover:bg-slate-100" onClick={() => makeNewEntry('point')}>{t('point')}</button>
            <button type="button" className="block py-3 px-4 w-full hover:bg-slate-100" onClick={() => makeNewEntry('line')}>{t('line')}</button>
            <button type="button" className="block py-3 px-4 w-full hover:bg-slate-100" onClick={() => makeNewEntry('polygon')}>{t('polygon')}</button>
          </div>
        </>
      : false}
    </>
  )
}
