'use client'
import { useState, useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';
import { navigate } from '@/lib/actions'

import WYSIWYGEditor from '@/components/dashboard/editors/wysiwyg-editor';

export default function AddContribution({ entryId }) {

  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');
  const { data : session } = useSession();

  const [addContributionOpen, setAddContributionOpen] = useState(false);
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")

  const saveContribution = () => {
    fetch(`/api/contribution`, {
      method : "POST",
      headers : { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entryId: entryId,
        name : name,
        authorId : session.user.id,
        comment: comment
      })
    }).then(resp => resp.json()).then(results => {
      if(results.error) {
        toast(results.error)
      } else {
        toast(t('saved-contribution'))
        if (window.confirm("Thank you for the contribution. Before being published, it will be briefly reviewed. Please check back soon.")) {
          window.location.reload();
        }
      }
    });
  }

  return (
    <div>

      <div className="cursor-pointer block border border-gray-100 hover:bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
        <div onClick={() => setAddContributionOpen(!addContributionOpen)}>Click here to add a new Contribution or Correction</div>
        {addContributionOpen ?
          <>
            {session && session.user ?
              <>
                <div className="w-full">
                  <div className="mt-2.5">
                    <div className="mt-2.5">
                      <label className="text-gray-800 text-normal mb-1 block font-bold">{t('create-contribution')}</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('name')} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"  />
                    </div>
                  </div>
                </div>
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
                      <button onClick={() => saveContribution()} className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        {tCommon('save')}
                      </button>
                      <button onClick={() => setAddContributionOpen(false)} className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none">
                        {tCommon('cancel')}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            :
              <div>You must be logged in to add a contribution.</div>
            }

          </>
        : false}
      </div>

    </div>
  );
}
