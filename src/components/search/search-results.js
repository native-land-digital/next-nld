'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { toast } from 'react-toastify';
import Link from 'next/link'

export default function SearchResults() {

  const t = useTranslations('Navigation');

  const [ search, setSearch ] = useState("")
  const [ results, setResults ] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('q');
    if(searchParam) {
      setSearch(searchParam)
      doSearch(searchParam)
    }
  }, [])

  const doSearch = (searchParam) => {
    fetch(`/api/search/general?page=0&s=${searchParam}`).then(resp => resp.json()).then(response => {
      if(response.error) {
        setResults(response);
      } else {
        setResults(response);
      }
    })
  }

  return (
    <div>
      <div>
        <form method="GET" action="/search" className="grid grid-cols-4 gap-2.5">
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="q" placeholder={`${t('search')}...`} className="col-span-3 w-full rounded-md border border-gray-300 px-4 py-2 text-slate-500 text-lg outline-blue-600" />
          <button className="col-span-1 rounded-lg px-4 py-2 bg-blue-800 text-white w-full" type="submit">Search</button>
        </form>
      </div>
      <div className="mt-4 rounded-md shadow-lg px-4 pb-4 break-words">
        {!results ? 
          <p>Please search by typing into the box above.</p> 
        : 
          <div>
            <h2>{results.totalResults} results</h2>
            {results.pages.length > 0 ? 
              <div>
                {results.pages.map((pageResult, i) => {
                  return (
                    <div key={`page-result-${i}`}>
                      <p><Link prefetch={false} href={pageResult.ref}>{pageResult.page.name}</Link></p>
                    </div>
                  )
                })}
              </div>
            : false}
            {results.entries.length > 0 ? 
              <div>
                {results.entries.map((entryResult, i) => {
                  return (
                    <div key={`entry-result-${i}`}>
                      <p><Link prefetch={false} href={`/listings/${entryResult.category}/${entryResult.slug}`}>{entryResult.name}</Link> - {entryResult.category}</p>
                    </div>
                  )
                })}
              </div>
            : false}
          </div>
        }
      </div>
    </div>
  )
}
