'use client'
import { useTranslations } from '@/i18n/client-i18n';

export default function VerificationEditor({ verification, setVerification }) {

  const t = useTranslations('Dashboard');

  const changeVerification = (value, prop) => {
    let newVerification = {
        verified : true,
        details : ""
    }
    if(verification) {
        newVerification = JSON.parse(JSON.stringify(verification))
    }
    newVerification[prop] = value;
    setVerification(newVerification)
  }

  return (
    <div>
        <div className="mt-2.5">
            <label className="text-gray-800 text-normal mb-1 block font-bold">{t('verified')}</label>
            <div className="relative">
            <label htmlFor="verified" className='capitalize text-sm'>
                <input id="verified" type="checkbox" checked={verification ? verification.verified : false} name="verified" onChange={(e) => changeVerification(e.target.checked, 'verified')} className="mr-1.5" />
                {t('verified')} {verification && verification.updatedAt ? `(${new Date(verification.updatedAt).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric",})})` : ''}
            </label>
            </div>
        </div>
        <div className="mt-2.5">
            <div className="relative flex items-center">
                <input value={verification ? verification.details : ""} onChange={(e) => changeVerification(e.target.value, 'details')} name="details" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('verified-text')} />
            </div>
        </div>
    </div>
  );
}
