'use client'
import FileUploader from '@/components/dashboard/utils/file-uploader';
import { toast } from 'react-toastify';
import { useTranslations } from '@/i18n/client-i18n';

export default function PronunciationsEditor({ pronunciations, setPronunciations }) {

  const t = useTranslations('Dashboard');
  const tMaps = useTranslations('Maps');

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
        const newPronunciations = JSON.parse(JSON.stringify(pronunciations))
        newPronunciations.newPronunciations(newPronunciations.findIndex(pronunciation => pronunciation.url === url), 1);
        setPronunciations(newGreetings);
      }
    }
  }

  const changePronunciation = (value, action, prop, index) => {
    const newPronunciations = [...pronunciations];
    if(action === 'edit') {
      newPronunciations[index][prop] = value;
    }
    setPronunciations(newPronunciations)
  }

  const afterUpload = (url) => {
    const newPronunciations = JSON.parse(JSON.stringify(pronunciations))
    newPronunciations.push({ url : url, text : '' })
    setPronunciations(newPronunciations);
  }

  return (
    <>
      <div className="my-2.5">
        {pronunciations.map((pronunciation, i) => {
          return (
            <div key={`pronunciation-${i}`} className="flex">
              <a href={`${pronunciation.url}`} target="_blank">
                <div className="w-40 h-20 relative flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
                  </svg>
                  <div className="absolute top-0 right-0" onClick={(e) => deleteObject(e, pronunciation.url)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill m-1 p-1 bg-white rounded cursor-pointer hover:bg-gray-200" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                  </div>
                </div>
              </a>
              <div className="ml-5 w-full">
                <div className="mb-2.5">
                  <div>
                    <label className="text-sm mb-2.5">{tMaps('text')}</label>
                    <input value={pronunciation.text} onChange={(e) => changePronunciation(e.target.value, 'edit', 'text', i)} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('text-placeholder')} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <FileUploader afterUpload={afterUpload} allowedTypes={"audio/midi, audio/mpeg, audio/ogg, audio/wav, audio/webm"} />
    </>
  );
}
