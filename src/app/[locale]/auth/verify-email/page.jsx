"use client"
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';

export default function VerifyEmail() {

  const t = useTranslations('Auth');
  const router = useRouter();

  const [ email, setEmail ] = useState("");
  const [ verificationKey, setVerificationKey ] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const thisEmail = urlParams.get('email');
    if(thisEmail && thisEmail !== "") {
      setEmail(thisEmail);
    }
  }, [])

  const verifyToken = async () => {
    let response = await fetch(`/api/users/verify-email?key=${verificationKey}&email=${email}`).then(resp => resp.json())
    if(response.error) {
      toast(response.error)
    } else {
      toast("Email verified! You may now log in.")
      setTimeout(() => {
        router.push(`/auth/login`);
      }, 500)
    }
  }

  const resendEmail = async () => {
    let response = await fetch(`/api/users/resend-email?email=${email}`).then(resp => resp.json())
    if(response.error) {
      toast(response.error)
    } else {
      toast(t('email-sent'))
    }
  }

  return (
    <div className="bg-blue-900 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">{t('verify-email')}</h2>
            <p className="text-black text-sm my-2.5">{t('verify-email-message')}</p>
            <div className="mt-4">
              <input value={verificationKey} onChange={(e) => setVerificationKey(e.target.value)} name="verification_key" type="text" className="w-full mb-2.5 text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('verification-placeholder')} />
              <button onClick={() => verifyToken()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                {t('verify-email')}
              </button>
              <p className="text-gray-800 text-sm !mt-8 text-center"><span className="text-blue-600 hover:underline ml-1 whitespace-nowrap cursor-pointer" onClick={() => resendEmail()}>{t('need-send')}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
