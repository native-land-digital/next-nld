'use client'
import { useState, useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { toast } from 'react-toastify';
import { navigate } from '@/lib/actions'
import Link from 'next/link'

export default function EditContribution({ contribution }) {

  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');

  const [ name, setName ] = useState(contribution.name);

  const saveContribution = () => {
    fetch(`/api/contribution/${contribution.id}`, {
      method : "PATCH",
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify({
      })
    }).then(resp => resp.json()).then(results => {
      if(results.error) {
        toast(results.error)
      } else {
        toast(t('saved-contribution'))
      }
    });
  }

  const deleteContribution = () => {
    if(window.confirm(t('delete-contribution-confirm'))) {
      fetch(`/api/contribution/${entry.id}`, {
        method : "DELETE"
      }).then(resp => resp.json()).then(results => {
        if(results.error) {
          toast(results.error)
        } else {
          setTimeout(() => {
            navigate(`/dashboard/contributions/`);
          }, 500)
          toast(t('contribution-entry'))
        }
      })
    }
  }

  return (
    <div>
      <Link prefetch={false} href="/dashboard/contributions"><div className="inline-block rotate-180 mr-2.5 mb-2.5">➜</div>{tCommon('back')}</Link>
      <h2 className="font-semibold text-3xl">{entry.name}</h2>
      <Link prefetch={false} href={`/contributions/${contribution.id}`} target="_blank" className="text-xs float-right">{t('see-live')} ➜</Link>
      <p className="text-xs mt-1" suppressHydrationWarning>{t('contribution-created')} {new Date(contribution.createdAt).toLocaleString()}</p>
      <hr className="mt-3 mb-3" />

      {name}

      <div className="flex">
        <div className="w-full md:w-1/2">
          <div className="!mt-8">
            <button onClick={() => saveContribution()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              {tCommon('save')}
            </button>
          </div>

        </div>

        <div className="w-full md:w-1/2">
          <div className="!mt-8 flex justify-end">
            <button onClick={() => deleteContribution()} className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none">
              {tCommon('delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
