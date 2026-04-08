
'use client'
import { useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';

import WYSIWYGEditor from '@/components/dashboard/editors/wysiwyg-editor';

export default function EditComment({ comment }) {

  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');
  const { data : session } = useSession();

  const [editCommentOpen, setEditCommentOpen] = useState(false);
  const [text, setText] = useState(comment.comment)

  const saveComment = () => {
    fetch(`/api/contribution/comment/${comment.id}`, {
      method : "PATCH",
      headers : { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentId : comment.id,
        comment: text
      })
    }).then(resp => resp.json()).then(results => {
      if(results.error) {
        toast(results.error)
      } else {
        toast(t('saved-comment'))
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
    });
  }

  return (
    <div>
      <div>
        {editCommentOpen ?
          <div>
            <WYSIWYGEditor text={text} setText={(text) => setText(text)} />
            <div className="flex">
              <div className="w-full">
                <div className="!mt-8 grid grid-cols-2 gap-4">
                  <button onClick={() => saveComment()} className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    {tCommon('save')}
                  </button>
                  <button onClick={() => setEditCommentOpen(false)} className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none">
                    {tCommon('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        :
          <div>
            <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
            {session && session.user && session.user.id === comment.author.id ?
              <div onClick={() => setEditCommentOpen(true)} className="mt-4 text-gray-400 text-xs cursor-pointer hover:underline">Edit comment</div>
            : false}
          </div>
        }
      </div>

    </div>
  );
}
