'use client'
import FileUploader from '@/components/dashboard/utils/file-uploader';
import { toast } from 'react-toastify';
import { useTranslations } from '@/i18n/client-i18n';

export default function GreetingEditor({ greetings, setGreetings }) {

  const t = useTranslations('Dashboard');

  const deleteObject = async (e, url) => {
    e.preventDefault();
    if(url) {
      const key = url.split('/')[url.split('/').length - 1];

      const response = await fetch(`/api/upload?key=${key}`, {
        method : "DELETE",
        headers : { 'Content-Type': 'application/json' }
      }).then(resp => resp.json());

      if(response.error) {
        toast(response.error);
      } else {
        const newGreetings = JSON.parse(JSON.stringify(greetings))
        newGreetings.splice(newGreetings.findIndex(greeting => greeting.url === url), 1);
        setGreetings(newGreetings);
      }
    }
  }

  const changeGreeting = (value, action, prop, index) => {
    const newGreeting = [...greetings];
    if(action === 'edit') {
      newGreetings[index][prop] = value;
    }
    setGreetings(newGreetings)
  }

  const afterUpload = (url) => {
    const newGreetings = JSON.parse(JSON.stringify(greetings))
    newGreetings.push({ url : url, translation : '', usage : '' })
    setGreetings(newGreetings);
  }

  return (
    <>
      <div className="my-2.5">
        {greetings.map((greeting, i) => {
          return (
            <div key={`greeting-${i}`} className="flex">
              <a href={`${greeting.url}`} target="_blank">
                <div className="w-40 h-40 bg-cover bg-no-repeat bg-center relative" style={{backgroundImage : `url(${greeting.url})`}}>
                  <div className="absolute top-0 right-0" onClick={(e) => deleteObject(e, greeting.url)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill m-1 p-1 bg-white rounded cursor-pointer hover:bg-gray-200" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                  </div>
                </div>
              </a>
              <div className="ml-5 w-full">
                <div className="mb-2.5">
                  <label className="text-sm mb-2.5">{t('title')}</label>
                  <input value={greeting.translation} onChange={(e) => changeGreeting(e.target.value, 'edit', 'title', i)} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('translation-placeholder')} />
                </div>
                <div>
                  <label className="text-sm mb-2.5">{t('caption')}</label>
                  <input value={greeting.usage} onChange={(e) => changeGreeting(e.target.value, 'edit', 'caption', i)} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('usage-placeholder')} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <FileUploader afterUpload={afterUpload} />
    </>
  );
}
