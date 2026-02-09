'use client'
import { useState, useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';
import { navigate } from '@/lib/actions'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import Link from 'next/link'

export default function EditContribution({ contribution, availableCategories, availableStages }) {

  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');
  const { data : session } = useSession();

  const [ name, setName ] = useState(contribution.name);
  const [ stageId, setStageId ] = useState(contribution.stageId);
  const [ categories, setCategories ] = useState(contribution.categories.map(cat => cat.id));
  const [ entries, setEntries ] = useState(contribution.entries)

  const [ allowedColumns, setAllowedColumns ] = useState([]);

  useEffect(() => {
    if(session && session.user) {
      const globalPermissionResearch = session.user.global_permissions.find(perm => perm.entity === 'research');
      if(globalPermissionResearch && globalPermissionResearch.columnNames === null) {
        setAllowedColumns(["all"]);
      } else if(globalPermissionResearch && globalPermissionResearch.columnNames.length > 0) {
        setAllowedColumns(globalPermissionResearch.columnNames);
      }
      const itemPermissionResearch = session.user.item_permissions.find(perm => perm.entity === 'research');
      if(itemPermissionResearch && itemPermissionResearch.entry === entry.id) {
        if(itemPermissionResearch.columnNames === null) {
          setAllowedColumns(["all"]);
        } else if(itemPermissionResearch.columnNames.length > 0) {
          setAllowedColumns(itemPermissionResearch.columnNames);
        }
      }
    }
  }, [session])

  const saveContribution = () => {
    fetch(`/api/contribution/${contribution.id}`, {
      method : "PATCH",
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        name : name,
        stageId : stageId,
        categories : categories,
        entries : entries
      })
    }).then(resp => resp.json()).then(results => {
      if(results.error) {
        toast(results.error)
      } else {
        toast(t('saved-contribution'))
      }
    });
  }

  const deleteContribution = () => {
    if(window.confirm(t('delete-contribution-confirm'))) {
      fetch(`/api/contribution/${contribution.id}`, {
        method : "DELETE"
      }).then(resp => resp.json()).then(results => {
        if(results.error) {
          toast(results.error)
        } else {
          setTimeout(() => {
            navigate(`/dashboard/contributions/`);
          }, 500)
          toast(t('contribution-entry'))
        }
      })
    }
  }

  const loadOptions = (inputValue, callback) => {
    if(inputValue.length >= 2) {
      fetch(`/api/entry/searcher?s=${inputValue}`).then(resp => resp.json()).then(response => {
        callback(response.map(entry => {
          return {
            value : entry.id,
            label : `${entry.name} (${entry.category})`
          }
        }));
      })
    }
  };

  console.log(contribution)

  return (
    <div>
      <Link prefetch={false} href="/dashboard/contributions"><div className="inline-block rotate-180 mr-2.5 mb-2.5">➜</div>{tCommon('back')}</Link>
      <h2 className="font-semibold text-3xl">{contribution.name}</h2>
      <Link prefetch={false} href={`/contributions/${contribution.id}`} target="_blank" className="text-xs float-right">{t('see-live')} ➜</Link>
      <p className="text-xs mt-1" suppressHydrationWarning>{t('contribution-created')} {new Date(contribution.createdAt).toLocaleString()}</p>
      <hr className="mt-3 mb-3" />

      <div className="w-full md:w-1/2">

        {allowedColumns.indexOf('all') > -1 || allowedColumns.indexOf('name') > -1 ?
          <div className="mt-2.5">
            <label className="text-gray-800 text-normal mb-1 block font-bold">{t('name')}</label>
            <div className="relative flex items-center">
              <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('enter-name')} />
            </div>
          </div>
        : false}

        {allowedColumns.indexOf('all') > -1 || allowedColumns.indexOf('stage') > -1 ?
          <div className="mt-2.5">
            <label className="text-gray-800 text-normal mb-1 block font-bold">{t('stage')}</label>
            <div className="relative flex items-center">
              <select onChange={(e) => setStageId(e.target.value)} value={stageId ? stageId : ""} className="text-sm capitalize h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none" >
                <option>({t('none')})</option>
                {availableStages.map(stage => {
                  return (<option key={`option-${stage.id}`} value={stage.id}>{stage.name}</option>)
                })}
              </select>
            </div>
          </div>
        : false}

        {allowedColumns.indexOf('all') > -1 || allowedColumns.indexOf('category') > -1 ?
          <div className="mt-2.5">
            <label className="text-gray-800 text-normal mb-1 block font-bold">{t('categories')}</label>
            <div className="relative flex items-center">
              <Select 
                className="w-full"
                isMulti={true}
                onChange={(e) => setCategories(e.map(category => category.value))}
                value={categories.map(category => {
                  const thisCategory = availableCategories.find(thisCat => thisCat.id === category);
                  return {
                    value : thisCategory.id,
                    label : thisCategory.name
                  }
                })}
                options={availableCategories.map(category => { return { value : category.id, label : category.name }})}
                />
            </div>
          </div>
        : false}

        {allowedColumns.indexOf('all') > -1 || allowedColumns.indexOf('entries') > -1 ?
          <div className="mt-2.5">
            <label className="text-gray-800 text-normal mb-1 block font-bold">{t('associated-research')}</label>
            <div className="relative flex items-center">
              <AsyncSelect 
                className="w-full"
                isMulti={true}
                value={entries.map(entry => { return { value : entry.id, label : entry.name }})} 
                onChange={(e) => setEntries(e.map(entry => { return { id : entry.value, name : entry.label } }))} 
                cacheOptions 
                loadOptions={loadOptions} 
                placeholder={t('type-search')} />
            </div>
          </div>
        : false}



      </div>

      <div className="flex">
        <div className="w-full md:w-1/2">
          <div className="!mt-8">
            <button onClick={() => saveContribution()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              {tCommon('save')}
            </button>
          </div>

        </div>

        <div className="w-full md:w-1/2">
          <div className="!mt-8 flex justify-end">
            <button onClick={() => deleteContribution()} className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none">
              {tCommon('delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
