import { useEffect, useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import AsyncSelect from 'react-select/async';
import Link from 'next/link'

import { isMobile } from '@/components/front-map/map-utils';

export default function SelectorControl({ map, selectedFeature, risksRenewalsOptions }) {

    const t = useTranslations('FrontMap');
    const tMaps = useTranslations('Maps');

    const [ showFilters, setShowFilters ] = useState(false)
    const [ resultsSlided, setResultsSlided ] = useState(false)

    useEffect(() => {
      if(!isMobile()) {
        setShowFilters(true)
      }
    }, [])

    useEffect(() => {
      if(selectedFeature) {
        setResultsSlided(false)
      }
    }, [selectedFeature])

    const selectDropdown = (id) => {
      fetch(`/api/entry/searcher?id=${id}&geosearch=true`).then(resp => resp.json()).then(entry => {
        if(entry[0]) {
          map.flyTo({ center : entry[0].centroid.coordinates, zoom : 13 })
        }
      })
    }

    const loadRisksRenewalsOptions = (inputValue, callback) => {
      if(inputValue.length >= 3) {
        fetch(`/api/entry/searcher?s=${inputValue}&category=risks,renewals`).then(resp => resp.json()).then(response => {
          callback(response.map(entry => {
            return {
              value : entry.id,
              label : entry.name
            }
          }));
        })
      }
    };

    return (

      <div className="md:h-auto w-full md:w-80 absolute z-10 left-0 top-0 font-noto-sans">
        <div className="w-full md:w-80">
          <div className="w-80 m-4 nld-bg-blue-800-10 rounded-full md:rounded-xl p-0 md:p-2.5">
            <div className="hidden md:flex">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_612_4906)">
                  <path d="M12.0081 15.3333C12.4684 15.3333 12.8415 15.7064 12.8415 16.1667C12.8415 16.6269 12.4684 17 12.0081 17H12C11.5398 17 11.1667 16.6269 11.1667 16.1667C11.1667 15.7064 11.5398 15.3333 12 15.3333H12.0081Z" fill="#A0C6CD"/>
                  <path d="M10.2446 7.45573C10.9231 7.05705 11.7208 6.91102 12.4964 7.04394C13.2721 7.17699 13.976 7.58052 14.4829 8.18245C14.9896 8.78436 15.2675 9.54657 15.2666 10.3333L15.256 10.5669C15.1498 11.7124 14.2787 12.4796 13.6455 12.9017C13.2826 13.1436 12.9254 13.3211 12.6624 13.438C12.5297 13.497 12.4174 13.5416 12.3369 13.5723C12.2967 13.5876 12.2638 13.5996 12.2401 13.6081C12.2283 13.6123 12.2189 13.6161 12.2116 13.6187C12.2081 13.6199 12.2051 13.6211 12.2026 13.6219C12.2016 13.6223 12.2002 13.6224 12.1994 13.6227L12.1978 13.6235L12.1148 13.6463C11.7026 13.7388 11.2787 13.5056 11.1423 13.0962C10.9974 12.6603 11.2326 12.1884 11.668 12.0423H11.6696C11.6718 12.0416 11.676 12.0403 11.6818 12.0382C11.6946 12.0337 11.7158 12.0261 11.7437 12.0155C11.7998 11.9941 11.8837 11.9605 11.9854 11.9154C12.191 11.824 12.4591 11.6896 12.721 11.515C13.2955 11.132 13.5998 10.7242 13.5999 10.3333V10.3317C13.6004 9.93828 13.4619 9.55686 13.2085 9.25586C12.955 8.95489 12.6027 8.75272 12.2149 8.6862C11.8271 8.61977 11.4278 8.69274 11.0886 8.89209C10.7494 9.09142 10.4917 9.40483 10.361 9.77588L10.3285 9.85482C10.1488 10.2372 9.70528 10.4293 9.29819 10.2861C8.86425 10.1333 8.63617 9.65733 8.78875 9.22331L8.84083 9.08496C9.11525 8.40308 9.60856 7.82956 10.2446 7.45573Z" fill="#A0C6CD"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.83333C17.0626 2.83333 21.1667 6.93739 21.1667 12C21.1667 17.0626 17.0626 21.1667 12 21.1667C6.9374 21.1667 2.83334 17.0626 2.83334 12C2.83334 6.93739 6.9374 2.83333 12 2.83333ZM12 4.5C7.85787 4.5 4.50001 7.85786 4.50001 12C4.50001 16.1421 7.85787 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5Z" fill="#A0C6CD"/>
                </g>
                <defs>
                  <clipPath id="clip0_612_4906">
                    <rect width="20" height="20" fill="white" transform="translate(2 2)"/>
                  </clipPath>
                </defs>
              </svg>
              <p className="ml-2.5 hidden md:block nld-text-sm nld-text-teal-100">{tMaps('search-address-risks-renewals')}</p>
            </div>
            <div id="nld_geocoder" className="m-0 mt-4" />
          </div>
        </div>

        <div onClick={() => setShowFilters(!showFilters)} className="block md:hidden absolute top-0 right-0 m-4">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8">
              <rect width="48" height="48" rx="24" fill="#0C1427" fill-opacity="0.8"/>
              <rect width="48" height="48" rx="24" fill="#0C1427" fill-opacity="0.8"/>
              <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#A8C8C8" stroke-opacity="0.8"/>
              <path d="M28 29C28.5523 29 29 29.4477 29 30V31H33C33.5523 31 34 31.4477 34 32C34 32.5523 33.5523 33 33 33H29V34C29 34.5523 28.5523 35 28 35C27.4477 35 27 34.5523 27 34V30C27 29.4477 27.4477 29 28 29Z" fill="#A0C6CD"/>
              <path d="M24 31C24.5523 31 25 31.4477 25 32C25 32.5523 24.5523 33 24 33H15C14.4477 33 14 32.5523 14 32C14 31.4477 14.4477 31 15 31H24Z" fill="#A0C6CD"/>
              <path d="M20 21C20.5523 21 21 21.4477 21 22V26C21 26.5523 20.5523 27 20 27C19.4477 27 19 26.5523 19 26V25H15C14.4477 25 14 24.5523 14 24C14 23.4477 14.4477 23 15 23H19V22C19 21.4477 19.4477 21 20 21Z" fill="#A0C6CD"/>
              <path d="M33 23C33.5523 23 34 23.4477 34 24C34 24.5523 33.5523 25 33 25H24C23.4477 25 23 24.5523 23 24C23 23.4477 23.4477 23 24 23H33Z" fill="#A0C6CD"/>
              <path d="M26 13C26.5523 13 27 13.4477 27 14V15H33C33.5523 15 34 15.4477 34 16C34 16.5523 33.5523 17 33 17H27V18C27 18.5523 26.5523 19 26 19C25.4477 19 25 18.5523 25 18V14C25 13.4477 25.4477 13 26 13Z" fill="#A0C6CD"/>
              <path d="M22 15C22.5523 15 23 15.4477 23 16C23 16.5523 22.5523 17 22 17H15C14.4477 17 14 16.5523 14 16C14 15.4477 14.4477 15 15 15H22Z" fill="#A0C6CD"/>
            </g>
          </svg>
        </div>

        <div className={`${showFilters ? 'block' : 'hidden'} md:block p-4 pt-0 w-80`}>
          <div>
            <AsyncSelect
              instanceId="risks-renewals-select"
              className="nld-select"
              classNamePrefix="nld-select"
              placeholder={
                <div className="flex items-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.25 7.5C17.25 12.75 12 15.75 12 15.75C12 15.75 6.75 12.75 6.75 7.5C6.75 6.10761 7.30312 4.77226 8.28769 3.78769C9.27226 2.80312 10.6076 2.25 12 2.25C13.3924 2.25 14.7277 2.80312 15.7123 3.78769C16.6969 4.77226 17.25 6.10761 17.25 7.5Z" fill="#1B4F58"/>
                    <path d="M18.3408 13.6514C18.5741 13.5391 18.842 13.5214 19.0879 13.6025L19.0967 13.6055C21.3646 14.4424 22.75 15.7118 22.75 17.25C22.75 18.0662 22.3695 18.7743 21.7471 19.3672C21.1278 19.957 20.2599 20.4436 19.248 20.8301C17.2233 21.6034 14.5661 22 12 22C9.43391 22 6.77674 21.6034 4.75195 20.8301C3.74015 20.4436 2.87221 19.957 2.25293 19.3672C1.63053 18.7743 1.25 18.0662 1.25 17.25C1.25 15.7117 2.63613 14.4425 4.9043 13.6064L4.91211 13.6035C5.15801 13.5224 5.42585 13.5401 5.65918 13.6523C5.8927 13.7648 6.07426 13.9639 6.16406 14.207C6.25378 14.4501 6.24492 14.7188 6.14062 14.9561C6.0363 15.1931 5.84419 15.3803 5.60449 15.4785L5.59668 15.4824C4.83836 15.7626 4.23654 16.0859 3.83008 16.4102C3.41247 16.7434 3.25 17.0363 3.25 17.25C3.25 17.4507 3.39327 17.7306 3.78223 18.0547C4.16236 18.3714 4.73744 18.6957 5.49805 18.9863C7.01709 19.5668 9.23596 20 12 20C14.764 20 16.9829 19.5668 18.502 18.9863C19.2626 18.6957 19.8376 18.3714 20.2178 18.0547C20.6067 17.7306 20.75 17.4507 20.75 17.25C20.75 17.0363 20.5878 16.7427 20.1699 16.4092C19.7634 16.0848 19.1617 15.7621 18.4033 15.4814L18.3955 15.4785C18.1558 15.3803 17.9637 15.1922 17.8594 14.9551C17.7551 14.7179 17.7462 14.4492 17.8359 14.2061C17.9257 13.9629 18.1073 13.7639 18.3408 13.6514Z" fill="#A0C6CD"/>
                    <path d="M11.4258 6.11426C11.6999 6.00073 12.002 5.97142 12.293 6.0293C12.5838 6.08723 12.8509 6.22977 13.0605 6.43945C13.2702 6.64913 13.4128 6.91622 13.4707 7.20703C13.5286 7.498 13.4993 7.80013 13.3857 8.07422C13.2722 8.34823 13.0796 8.58229 12.833 8.74707C12.5864 8.91182 12.2966 9 12 9C11.6022 9 11.2208 8.84185 10.9395 8.56055C10.6581 8.27924 10.5 7.89782 10.5 7.5C10.5 7.2034 10.5882 6.91363 10.7529 6.66699C10.9177 6.42038 11.1518 6.2278 11.4258 6.11426Z" fill="#A0C6CD"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C13.6576 1.25 15.2468 1.90895 16.4189 3.08105C17.591 4.25316 18.25 5.8424 18.25 7.5C18.25 10.3947 16.8593 12.6447 15.457 14.1777C14.0556 15.7097 12.6257 16.5445 12.501 16.6172L12.499 16.6182C12.3479 16.7045 12.177 16.75 12.0029 16.75C11.8289 16.75 11.658 16.7045 11.5068 16.6182C11.3756 16.5435 9.94508 15.71 8.54395 14.1797C7.14085 12.6472 5.75 10.397 5.75 7.5C5.75 5.8424 6.40895 4.25316 7.58105 3.08105C8.75316 1.90895 10.3424 1.25 12 1.25ZM12 3.25C10.8728 3.25 9.79215 3.69809 8.99512 4.49512C8.19809 5.29215 7.75 6.37283 7.75 7.5C7.75 9.40413 8.5581 10.9965 9.51855 12.2168C10.4039 13.3416 11.4106 14.1377 12 14.5537C12.5889 14.1381 13.5951 13.3425 14.4805 12.2178C15.4412 10.9973 16.25 9.40435 16.25 7.5C16.25 6.37283 15.8019 5.29215 15.0049 4.49512C14.2079 3.69809 13.1272 3.25 12 3.25Z" fill="#A0C6CD"/>
                  </svg>
                  <div className="ml-2.5">{t('search-risks-renewals')}</div>
                </div>
              }
              onChange={(e) => selectDropdown(e.value)}
              cacheOptions
              defaultOptions={risksRenewalsOptions.map(riskRenewal => { return { value : riskRenewal.id, label : riskRenewal.name }})}
              loadOptions={loadRisksRenewalsOptions} />
          </div>
        </div>
        
        {selectedFeature ?
          <div className={
            !isMobile() ? 
              `nld-text-sm nld-text-teal-100 m-4 mt-0 nld-bg-blue-800-10 rounded-xl p-2.5 relative transition ease-in-out ${resultsSlided ? 'w-full -translate-x-64' : ''}`
            :
              `fixed h-[33vh] w-full bottom-0 nld-text-sm nld-text-teal-100 bg-white rounded-t-xl p-2.5 z-[999] transition ease-in-out ${resultsSlided ? 'translate-y-[33vh]' : ''}`
          }>
            <div className="absolute top-0 right-0 block md:hidden p-1" onClick={() => {
              if(isMobile()) {
                setResultsSlided(!resultsSlided)
              }
            }}>
              {resultsSlided ?
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
              :
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              }
            </div>
            {isMobile() ? 
              <div>
                <h3 className="nld-text-md nld-text-grey-500 font-semibold">Listings</h3>
                <p className="mt-2.5 italic nld-text-grey-300">{t('contact-nations')}</p>
                <ul className="mt-4 list-none">
                  <li>
                    <Link className="nld-text-grey-500 flex items-center" prefetch={false} href={process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'preview' ? selectedFeature.properties.description.substring(selectedFeature.properties.description.indexOf('/')) : selectedFeature.properties.description} target="_blank">
                      {selectedFeature.properties.Name} 
                      <svg className="ml-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33301 2.66699C7.70109 2.66699 7.99982 2.96497 8 3.33301C8 3.7012 7.7012 4 7.33301 4H3.33301C3.15639 4.00009 2.98724 4.07047 2.8623 4.19531C2.73728 4.32034 2.66699 4.49018 2.66699 4.66699V12.667C2.66708 12.8437 2.73736 13.0127 2.8623 13.1377C2.98725 13.2626 3.15631 13.3329 3.33301 13.333H11.333C11.5098 13.333 11.6797 13.2627 11.8047 13.1377C11.9295 13.0128 11.9999 12.8436 12 12.667V8.66699C12 8.2988 12.2988 8 12.667 8C13.035 8.00018 13.333 8.29891 13.333 8.66699V12.667C13.3329 13.1973 13.1221 13.7061 12.7471 14.0811C12.372 14.4559 11.8633 14.667 11.333 14.667H3.33301C2.80269 14.6669 2.29394 14.4561 1.91895 14.0811C1.54395 13.7061 1.33309 13.1973 1.33301 12.667V4.66699C1.33301 4.13671 1.54408 3.62797 1.91895 3.25293C2.29394 2.87793 2.80269 2.66708 3.33301 2.66699H7.33301ZM14 1.33301C14.0426 1.33301 14.085 1.33856 14.127 1.34668C14.1505 1.35122 14.1727 1.35926 14.1953 1.36621C14.2155 1.3724 14.2362 1.37662 14.2559 1.38477C14.2762 1.39322 14.2943 1.40568 14.3135 1.41602C14.332 1.42599 14.3514 1.43443 14.3691 1.44629C14.4423 1.49514 14.5049 1.55773 14.5537 1.63086C14.5656 1.6486 14.574 1.66797 14.584 1.68652C14.5943 1.70575 14.6068 1.72384 14.6152 1.74414C14.6234 1.76375 14.6276 1.78453 14.6338 1.80469C14.6529 1.86677 14.667 1.93165 14.667 2V6C14.667 6.36819 14.3682 6.66699 14 6.66699C13.6318 6.66699 13.333 6.36819 13.333 6V3.61035L8.47168 8.47168C8.21133 8.73201 7.78866 8.73202 7.52832 8.47168C7.26799 8.21134 7.26799 7.78867 7.52832 7.52832L12.3896 2.66699H10C9.63181 2.66699 9.33301 2.36819 9.33301 2C9.33301 1.63181 9.63181 1.33301 10 1.33301H14Z" fill="#29646F"/>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            : 
              <ul className="list-none">
                <li>
                  <Link className="font-semibold nld-text-teal-100 hover:underline" prefetch={false} href={process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'preview' ? selectedFeature.properties.description.substring(selectedFeature.properties.description.indexOf('/')) : selectedFeature.properties.description} target="_blank">{selectedFeature.properties.Name} ↗</Link>
                </li>
              </ul>
            }
          </div>
        : false}
      </div>
    )
}
