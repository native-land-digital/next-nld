'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from '@/i18n/client-i18n';

export default function CreatePolygon() {

  const t = useTranslations('Dashboard');
  const router = useRouter();

  const makeNewContribution = (type) => {
    const name = window.prompt(t('enter-name'));
    if(name) {
      fetch('/api/contribution', {
        method : "POST",
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify({
          name : name
        })
      }).then(resp => resp.json()).then(results => {
        if(results.error) {
          toast(results.error)
        } else {
          router.push(`/dashboard/contribution/${results.id}`);
        }
      });
    }
  }

  return (
    <>
      <button type="button" onClick={() => makeNewContribution()} className="py-3 px-4 gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
        {t('create-contribution')}
      </button>
    </>
  )
}
