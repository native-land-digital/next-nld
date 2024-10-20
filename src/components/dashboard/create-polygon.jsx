'use client'

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from '@/i18n/client-i18n';

export default function CreatePolygon() {

  const t = useTranslations('Dashboard');
  const router = useRouter();

  const makeNewPolygon = () => {
    const name = window.prompt("Enter a name for the new polygon");
    if(name) {
      fetch('/api/entry', {
        method : "POST",
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify({
          name : name,
          type : "polygon"
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
      <button type="button" onClick={() => makeNewPolygon()} className="py-3 px-4 gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
        {t('create-polygon')}
      </button>
    </>
  )
}
