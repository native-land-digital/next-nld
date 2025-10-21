'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
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
      <div className="w-full nld-bg-brown-500 text-center px-8 py-16">
        <div className="w-full lg:w-2/3 m-auto">
          <form method="GET" action="/search" className="grid grid-cols-4 gap-2.5">
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="q" placeholder={`${t('search')}...`} className="col-span-3 w-full rounded-md border border-gray-300 px-4 py-2 text-slate-500 text-lg outline-blue-600" />
            <button className="col-span-1 nld-bg-yellow-500 nld-text-brown-500 px-4 py-3 rounded-full ml-4 nld-button-md font-semibold" type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className="w-full lg:w-3/5 m-auto mt-12 text-black static-page">
        <div className="col-span-2 mt-5">
          <div className="pb-4 break-words">
            <div className="mt-4 break-words text-left">
              {!results ? 
                <p>Please search by typing into the box above.</p> 
              : false}
            </div>
            <div>
              {results ? 
                <div>
                  <h2 className="nld-font-h2">{results.totalResults} results</h2>
                  {results.pages.length > 0 ? 
                    <div className="mt-4">
                      {results.pages.map((pageResult, i) => {
                        return (
                          <div key={`page-result-${i}`}>
                            <p><Link className="nld-text-teal-100 nld-text-lg" prefetch={false} href={pageResult.ref}>{pageResult.page.name}</Link></p>
                          </div>
                        )
                      })}
                    </div>
                  : false}
                  {results.entries.length > 0 ? 
                    <div className="mt-4">
                      {results.entries.map((entryResult, i) => {
                        return (
                          <div key={`entry-result-${i}`}>
                            <p><Link className="nld-text-teal-100 nld-text-lg" prefetch={false} href={`/listings/${entryResult.category}/${entryResult.slug}`}>{entryResult.name}</Link> - <span className="capitalize">{entryResult.category}</span></p>
                          </div>
                        )
                      })}
                    </div>
                  : false}
                </div>
              : false }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
