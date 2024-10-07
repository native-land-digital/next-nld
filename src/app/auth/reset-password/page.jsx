"use client"
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ResetPassword() {

  const t = useTranslations('Auth');
  const router = useRouter();

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ token, setToken ] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const thisToken = urlParams.get('token');
    if(thisToken && thisToken !== "") {
      setToken(thisToken);
    }
  }, [])

  const resetPassword = async () => {
    if(token) {
      let response = await fetch(`/api/users/reset-password`, {
        method : "POST",
        body : JSON.stringify({
          token : token,
          password : password
        })
      }).then(resp => resp.json())
      if(response.error) {
        toast(response.error)
      } else {
        toast("Password reset! You may now log in.")
        setTimeout(() => {
          router.push(`/auth/login`);
        }, 500)
      }
    }
  }

  const sendToken = async () => {
    let response = await fetch(`/api/users/reset-password?email=${email}`).then(resp => resp.json())
    if(response.error) {
      toast(response.error)
    } else {
      toast(t('email-sent'))
    }
  }

  return (
    <div>
      <h2 className="text-gray-800 text-center text-2xl font-bold">{t('reset-password')}</h2>
      <p className="text-black text-sm my-2.5">{token ? t('reset-password-message-reset') : t('reset-password-message')}</p>
      <div className="mt-4">
        {token ?
          <div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="w-full mb-2.5 text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('password-placeholder')} />
            <button onClick={() => resetPassword()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              {t('reset-password')}
            </button>
          </div>
        :
          <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" className="w-full mb-2.5 text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('email-placeholder')} />
            <button onClick={() => sendToken()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              {t('reset-password')}
            </button>
          </div>
        }
        <p className="text-gray-800 text-sm !mt-8 text-center"><a href="/auth/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">{t('sign-in')}</a></p>
      </div>
    </div>
  );
}
