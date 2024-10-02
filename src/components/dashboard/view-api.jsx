'use client';
import { useState } from 'react'
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

export default function ViewAPI({ user }) {

  const t = useTranslations('Dashboard');

  const [ agreement, saveAgreement ] = useState(user.agreed_treaty);

  const agreeToTreaty = async () => {
    const response = await fetch(`/api/users/agree-treaty?id=${user.id}&agree=${agreement}`).then(resp => resp.json())
    if(response.error) {
      toast(response.error)
    } else {
      window.location.reload();
    }
  }

  return (
    <div>
      <div className="w-full py-4 px-2 bg-blue-200 rounded">
        <input type="checkbox" checked={agreement ? true : false}  onChange={(e) => saveAgreement(e.target.checked)}/> <a className="ml-2.5 underline" href="https://api-docs.native-land.ca/data-sovereignty-treaty">{t('data-sov')} ➜</a>
      </div>
      {agreement !== user.agreed_treaty ?
        <button onClick={() => agreeToTreaty()} className="mt-2.5 md:col-span-1 border bg-gray-100 hover:bg-gray-300 border-gray-300 px-4 py-3 rounded">{t('sign-agreement')}</button>
      : false}
      {user.agreed_treaty && agreement ?
        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">{t('api-key')}</label>
          <div className="relative flex items-center">
            <input value={user.api_key} name="api_key" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" disabled={true} />
          </div>
        </div>
      : false}
    </div>
  )
}
