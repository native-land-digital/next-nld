import { getTranslations } from '@/i18n/server-i18n';

export default async function Websites({ websites }) {

  const t = await getTranslations('Listings');

  if(websites.length === 0) {
    return (<p>{t('no-websites')}</p>)
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {websites.map((website, i) => {
        return (
          <a href={website.url} target="_blank">
            <div className="nld-font-noto nld-text-md nld-bg-grey-50 rounded-xl p-4">
              <div className="flex items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="20" fill="#DEC170"/>
                  <path d="M19 12C19.5523 12 20 12.4477 20 13C20 13.5523 19.5523 14 19 14H13C12.7348 14 12.4805 14.1054 12.293 14.293C12.1054 14.4805 12 14.7348 12 15V27C12 27.2652 12.1054 27.5195 12.293 27.707C12.4805 27.8946 12.7348 28 13 28H25C25.2652 28 25.5195 27.8946 25.707 27.707C25.8946 27.5195 26 27.2652 26 27V21C26 20.4477 26.4477 20 27 20C27.5523 20 28 20.4477 28 21V27C28 27.7957 27.6837 28.5585 27.1211 29.1211C26.5585 29.6837 25.7957 30 25 30H13C12.2044 30 11.4415 29.6837 10.8789 29.1211C10.3163 28.5585 10 27.7957 10 27V15C10 14.2044 10.3163 13.4415 10.8789 12.8789C11.4415 12.3163 12.2044 12 13 12H19ZM29 10C29.0563 10 29.1113 10.0057 29.165 10.0146C29.1738 10.0161 29.1827 10.0169 29.1914 10.0186L29.2012 10.0205C29.211 10.0225 29.2207 10.025 29.2305 10.0273C29.251 10.0322 29.2717 10.0368 29.292 10.043C29.3408 10.0578 29.3873 10.0778 29.4326 10.0996C29.4466 10.1063 29.4609 10.1127 29.4746 10.1201C29.6203 10.1989 29.7441 10.3125 29.835 10.4502C29.8597 10.4877 29.8812 10.5266 29.9004 10.5664C29.9222 10.6116 29.9412 10.6584 29.9561 10.707C29.9623 10.7273 29.9668 10.748 29.9717 10.7686C29.9893 10.8429 30 10.9202 30 11V17C30 17.5523 29.5523 18 29 18C28.4477 18 28 17.5523 28 17V13.4141L20.707 20.707C20.3165 21.0975 19.6835 21.0975 19.293 20.707C18.9025 20.3165 18.9025 19.6835 19.293 19.293L26.5859 12H23C22.4477 12 22 11.5523 22 11C22 10.4477 22.4477 10 23 10H29Z" fill="#29646F"/>
                </svg>
                <div>
                  <div className="ml-4 nld-text-teal-500 nld-text-md font-semibold">{website.title && website.title !== "" ? website.title : website.url}</div>
                  <div className="ml-4 mt-1 nld-text-grey-300 nld-label-sm uppercase">{website.url.replace('http://', '').replace('https://', '').split('/')[0]}</div>
                </div>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  );
}
