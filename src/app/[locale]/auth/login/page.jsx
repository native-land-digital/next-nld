"use client"
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from "next-auth/react";
import { useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';

export default function Login() {

  const t = useTranslations('Auth');
  const router = useRouter();

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ rememberMe, setRememberMe ] = useState(false);

  useEffect(() => {
    const saved_email = localStorage.getItem('nld_email')
    if(typeof saved_email === 'string') {
      setEmail(saved_email)
    }
    const saved_remember = localStorage.getItem('nld_rememberMe')
    if(saved_remember) {
      setRememberMe(saved_remember === 'true' ? true : false)
    }
  }, [])

  const doSignIn = async () => {
    if(rememberMe) {
      localStorage.setItem('nld_email', email);
      localStorage.setItem('nld_rememberMe', rememberMe ? 'true' : 'false');
    }
    const results = await signIn('credentials', {
      email : email,
      password : password,
      redirect : false
    });
;    if(!results) {
      toast(t('error-log'));
    } else {
      if(results.error) {
        toast(<div dangerouslySetInnerHTML={{ __html : results.error }} />);
      } else {
        router.push('/dashboard');
      }
    }
  }

  return (
    <div className="bg-blue-900 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">{t('sign-in')}</h2>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">{t('email')}</label>
              <div className="relative flex items-center">
                <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('email-placeholder')} />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block mt-2.5">{t('password')}</label>
              <div className="relative flex items-center">
                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('password-placeholder')} />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-2.5">
              <div className="flex items-center">
                <input checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  {t('remember-me')}
                </label>
              </div>
            </div>

            <div className="!mt-8">
              <button onClick={() => doSignIn()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                {t('sign-in')}
              </button>
            </div>

            <p className="text-gray-800 text-sm !mt-8 text-center">{t('no-account')} <a href="/auth/signup" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">{t('register-here')}</a></p>
            <p className="text-gray-800 text-sm !mt-2.5 text-center"><a href="/auth/reset-password" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">{t('reset-password')}</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
