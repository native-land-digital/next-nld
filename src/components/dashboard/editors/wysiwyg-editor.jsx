'use client'
import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';

export default function WYSIWYGEditor({ sources, setSources }) {

  const editorRef = useRef(null);
  const TINY_MCE_KEY = process.env.NEXT_PUBLIC_TINYMCE_KEY;

  return (
    <div className="relative flex items-center min-h-[300px]">
      <Editor
         id="tiny-mce-editor"
         apiKey={TINY_MCE_KEY}
         onInit={(evt, editor) => editorRef.current = editor}
         value={sources}
         onEditorChange={(content) => {
           setSources(content)
         }}
         init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'link | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
      />
    </div>
  );
}
