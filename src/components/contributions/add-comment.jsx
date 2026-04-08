'use client'
import { useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';

import WYSIWYGEditor from '@/components/dashboard/editors/wysiwyg-editor';

export default function AddComment({ contributionId }) {

  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');
  const { data : session } = useSession();

  const [addCommentOpen, setAddCommentOpen] = useState(false);
  const [comment, setComment] = useState("")

  const saveComment = () => {
    fetch(`/api/contribution/comment`, {
      method : "POST",
      headers : { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contributionId : contributionId,
        authorId : session.user.id,
        comment: comment
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
        {session && session.user ?
          <button onClick={() => setAddCommentOpen(true)} className="py-3 px-4 text-md tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            {t('add-comment')}
          </button>
          :
          <div>You must be logged in to comment.</div>
        }
      </div>

      {addCommentOpen ?
        <>
          <div className="w-full">
            <div className="mt-2.5">
              <div className="mt-2.5">
                <label className="text-gray-800 text-normal mb-1 block font-bold">{t('add-comment')}</label>
                <WYSIWYGEditor text={comment} setText={(text) => setComment(text)} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-full">
              <div className="!mt-8 grid grid-cols-2 gap-4">
                <button onClick={() => saveComment()} className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  {tCommon('save')}
                </button>
                <button onClick={() => setAddCommentOpen(false)} className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none">
                  {tCommon('cancel')}
                </button>
              </div>
            </div>
          </div>
        </>
      : false}


    </div>
  );
}
