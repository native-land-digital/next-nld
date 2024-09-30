"use client"
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';

export default function Signup() {

  const t = useTranslations('Auth');
  const router = useRouter();

  const [ email, setEmail ] = useState("");
  const [ name, setName ] = useState("");
  const [ organization, setOrganization ] = useState("");
  const [ password, setPassword ] = useState("");

  const doSignUp = async () => {
    fetch('/api/users', {
      method : "POST",
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        email : email,
        name : name,
        organization : organization,
        password : password
      })
    }).then(resp => resp.json()).then(results => {
      if(results.error) {
        toast(results.error)
      } else {
        router.push(`/verify-email?email=${email}`);
      }
    });
  }

  return (
    <div className="bg-blue-900 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">{t('sign-up')}</h2>
            <p className="text-gray-800 text-sm mt-2.5">{t('welcome')}</p>
            <hr className="border-slate-400 mb-4 mt-4 w-6/12 m-auto" />
            <div>
              <label className="text-gray-800 text-sm mb-1.5 block">{t('name')}</label>
              <div className="relative flex items-center">
                <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('name-placeholder')} />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-1.5 block mt-3">{t('email')}</label>
              <div className="relative flex items-center">
                <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('email-placeholder')} />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-1.5 block mt-3">{t('password')}</label>
              <div className="relative flex items-center">
                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('password-placeholder')} />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-1.5 block mt-3">{t('organization')}</label>
              <p className="text-gray-800 text-xs mb-1.5">{t('organization-note')}</p>
              <div className="relative flex items-center">
                <input value={organization} onChange={(e) => setOrganization(e.target.value)} name="organization" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('organization-placeholder')} />
              </div>
            </div>

            <div className="!mt-8">
              <button onClick={() => doSignUp()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                {t('sign-up')}
              </button>
            </div>

            <p className="text-gray-800 text-sm !mt-8 text-center">{t('have-account')} <a href="/auth/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">{t('log-here')}</a></p>

          </div>
        </div>
      </div>
    </div>
  );
}
