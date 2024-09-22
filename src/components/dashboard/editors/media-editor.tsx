'use client'
import FileUploader from '@/components/dashboard/utils/file-uploader';
import { toast } from 'react-toastify';

export default function MediaEditor({ media, setMedia }) {

  const deleteObject = (e, url) => {
    e.preventDefault();
    if(url) {
      let key = url.split('/')[url.split('/').length - 1];
      fetch(`/api/upload?key=${key}`, {
        method : "DELETE",
        headers : { 'Content-Type': 'application/json' }
      }).then(resp => resp.json()).then(response => {
        if(response.error) {
          toast(response.error);
        } else {
          let newMedia = JSON.parse(JSON.stringify(media))
          newMedia.splice(newMedia.findIndex(thisMedia => thisMedia.url === url), 1);
          setMedia(newMedia);
        }
      })
    }
  }

  return (
    <>
      <div className="grid grid-cols-6 gap-x-2.5 gap-y-2.5 my-2.5">
        {media.map((thisMedia, i) => {
          return (
            <a key={`media-${i}`} href={`${thisMedia.url}`} target="_blank">
              <div className="w-full h-40 bg-cover bg-no-repeat bg-center relative" style={{backgroundImage : `url(${thisMedia.url})`}}>
                <div className="absolute top-0 right-0" onClick={(e) => deleteObject(e, thisMedia.url)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill m-1 p-1 bg-white rounded cursor-pointer hover:bg-gray-200" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                  </svg>
                </div>
              </div>
            </a>
          )
        })}
      </div>
      <FileUploader media={media} setMedia={setMedia} />
    </>
  );
}
