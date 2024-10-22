'use client'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useTranslations } from '@/i18n/client-i18n';

export default function FileUploader({ afterUpload }) {

  const t = useTranslations('Dashboard');

  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async () => {

    if (!file) {
      toast(t('select-file'))
      return
    }

    setUploading(true)

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    if (response.ok) {
      const { url, fields } = await response.json()

      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        afterUpload(`${process.env.NEXT_PUBLIC_AWS_NEXT_CLOUDFRONT}/${fields.key}`)
      } else {
        toast(t('s3-error'), uploadResponse)
        toast(t('upload-failed'))
      }
    } else {
      toast(t('signed-upload-failed'))
    }

    setUploading(false)
  }

  return (
    <div>
      <div>
        <input
          id="file"
          type="file"
          onChange={(e) => {
            const files = e.target.files
            if (files) {
              setFile(files[0])
            }
          }}
          accept="image/png, image/jpeg"
          className="block w-full text-xs text-slate-500"
        />
      </div>
      {file ?
        <button className="mt-2.5 py-1 px-2.5 text-sm tracking-wide rounded-lg text-white bg-gray-500 hover:bg-gray-400 focus:outline-none" type="submit" disabled={uploading} onClick={() => handleSubmit()}>
          {t('upload')}
        </button>
      : false}
    </div>
  )
}
