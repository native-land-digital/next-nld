'use client'
import { useState } from 'react'
import { toast } from 'react-toastify';

export default function FileUploader({ media, setMedia }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async () => {

    if (!file) {
      toast('Please select a file to upload.')
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
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        const newMedia = JSON.parse(JSON.stringify(media))
        newMedia.push({ url : `${url}${fields.key}` })
        setMedia(newMedia);
      } else {
        toast('S3 Upload Error:', uploadResponse)
        toast('Upload failed.')
      }
    } else {
      toast('Failed to get pre-signed URL.')
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
          Upload
        </button>
      : false}
    </div>
  )
}
