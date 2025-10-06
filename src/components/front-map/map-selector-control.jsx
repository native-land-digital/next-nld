import { useEffect, useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import Switch from "react-switch";
import AsyncSelect from 'react-select/async';
import Link from 'next/link'

import { makeBoundsFromPoly, isMobile } from '@/components/front-map/map-utils';

export default function SelectorControl({ allLayers, map, currentLayers, setCurrentLayers, selectedFeatures, setSelectedFeatures, territoryOptions, languageOptions, treatyOptions }) {

    const t = useTranslations('FrontMap');
    const tMaps = useTranslations('Listings');

    const [ toggledFeatures, setToggledFeatures ] = useState([])
    const [ showFilters, setShowFilters ] = useState(false)
    const [ resultsSlided, setResultsSlided ] = useState(false)

    useEffect(() => {
      if(!isMobile()) {
        setShowFilters(true)
      }
    }, [])

    useEffect(() => {
      if(selectedFeatures.length > 0) {
        setResultsSlided(false)
      }
    }, [selectedFeatures])

    const adjustCurrentLayers = (checked, layer) => {
      const newCurrentLayers = JSON.parse(JSON.stringify(currentLayers));
      if(checked) {
        newCurrentLayers.push(layer);
      } else {
        newCurrentLayers.splice(newCurrentLayers.indexOf(layer), 1);
      }
      setCurrentLayers(newCurrentLayers);
    }

    const nationToggle = (slug) => {
      const newToggledFeatures = JSON.parse(JSON.stringify(toggledFeatures))
      if(newToggledFeatures.indexOf(slug) > -1) {
        newToggledFeatures.splice(newToggledFeatures.indexOf(slug), 1)
      } else {
        newToggledFeatures.push(slug);
      }
      allLayers.forEach(layer => {
        map.setFilter(layer, [
          "!",
          ["in", ["get", "Slug"], ["literal", newToggledFeatures]],
        ]);
        map.setFilter(layer + "_text", [
          "!",
          ["in", ["get", "Slug"], ["literal", newToggledFeatures]],
        ]);
      })
      setToggledFeatures(newToggledFeatures)
    }

    const selectDropdown = (id, category) => {
      fetch(`/api/entry/searcher?id=${id}&geosearch=true`).then(resp => resp.json()).then(entry => {
        const bounds = makeBoundsFromPoly(entry[0])
        map.fitBounds(bounds, { padding : 20 })
        adjustCurrentLayers(true, category);
        map.once('moveend', () => {
          const latlng = { lat : entry[0].centroid.coordinates[1], lng : entry[0].centroid.coordinates[0] }
          map.fire('click', { latLng : latlng, point: map.project(latlng), originalEvent : {} });
        }, 500)
      })
    }

    const loadTerritoryOptions = (inputValue, callback) => {
      if(inputValue.length >= 3) {
        fetch(`/api/entry/searcher?s=${inputValue}&category=territories`).then(resp => resp.json()).then(response => {
          callback(response.map(entry => {
            return {
              value : entry.id,
              label : entry.name
            }
          }));
        })
      }
    };

    const loadLanguageOptions = (inputValue, callback) => {
      if(inputValue.length >= 3) {
        fetch(`/api/entry/searcher?s=${inputValue}&category=languages`).then(resp => resp.json()).then(response => {
          callback(response.map(entry => {
            return {
              value : entry.id,
              label : entry.name
            }
          }));
        })
      }
    };

    const loadTreatyOptions = (inputValue, callback) => {
      if(inputValue.length >= 3) {
        fetch(`/api/entry/searcher?s=${inputValue}&category=treaties`).then(resp => resp.json()).then(response => {
          callback(response.map(entry => {
            return {
              value : entry.id,
              label : entry.name
            }
          }));
        })
      }
    };

    const setGreetingsLayer = (checked) => {
      if(checked && map) {
        setCurrentLayers(['greetings'])
        map.flyTo({ center : [-100.1953125, 47.27922900257082] })
      } else {
        setCurrentLayers([])
      }
    }

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
              <p className="ml-2.5 hidden md:block nld-text-sm nld-text-teal-100">{t('search-address')}</p>
            </div>
            <div id="nld_geocoder" className="m-0 mt-4" />
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

          {showFilters ?
            <div className="w-80 nld-text-sm nld-text-teal-100 m-4 nld-bg-blue-800-10 rounded-xl p-2.5">
              <div className="flex items-center ">
                <Switch
                  checked={currentLayers.indexOf('territories') > -1}
                  onChange={(checked) => adjustCurrentLayers(checked, 'territories')}
                  width={40}
                  height={20}
                  onColor={"#A0C6CD"} // teal-100
                  uncheckedIcon={false}
                  checkedIcon={false}
                  handleDiameter={15} />
                <p className="ml-2.5 inline">{t('territories')}</p>
              </div>
              <div className="mt-2.5 flex items-center">
                <Switch
                  checked={currentLayers.indexOf('languages') > -1}
                  onChange={(checked) => adjustCurrentLayers(checked, 'languages')}
                  width={40}
                  height={20}
                  onColor={"#A0C6CD"} // teal-100
                  uncheckedIcon={false}
                  checkedIcon={false}
                  handleDiameter={15} />
                <p className="ml-2.5 inline">{t('languages')}</p>
              </div>
              <div className="mt-2.5 flex items-center">
                <Switch
                  checked={currentLayers.indexOf('treaties') > -1}
                  onChange={(checked) => adjustCurrentLayers(checked, 'treaties')}
                  width={40}
                  height={20}
                  onColor={"#A0C6CD"} // teal-100
                  uncheckedIcon={false}
                  checkedIcon={false}
                  handleDiameter={15} />
                <p className="ml-2.5 inline">{t('treaties')}</p>
              </div>
              <div className="hidden bg-white rounded md:absolute md:right-0 md:-mr-[90px] md:shadow-lg md:p-2.5">
                <span className="md:hidden bg-green-700 p-1 rounded text-xs text-white absolute right-0 -mt-4 -mr-4">{t('new')}</span>
                <Switch
                  checked={currentLayers.indexOf('greetings') > -1}
                  onChange={(checked) => setGreetingsLayer(checked)}
                  width={40}
                  height={20}
                  onColor={"#A0C6CD"} // teal-100
                  uncheckedIcon={false}
                  checkedIcon={false}
                  handleDiameter={15} />
                <p>{tMaps('greetings')}</p>
                <span className="hidden md:block bg-green-700 p-1 rounded text-xs text-white ml-3.5 absolute mt-1">{t('new')}</span>
              </div>
            </div>
          : false}
        </div>

        <div className={`${showFilters ? 'block' : 'hidden'} md:block p-4 pt-0 w-80 `}>
          <div>
            <AsyncSelect
              instanceId="territories-select"
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
                  <div className="ml-2.5">{t('search-territories')}</div>
                </div>
              }
              onChange={(e) => selectDropdown(e.value, 'territories')}
              defaultOptions={territoryOptions.map(territory => { return { value : territory.id, label : territory.name }})}
              cacheOptions
              loadOptions={loadTerritoryOptions} />
          </div>
          <div className="mt-2.5">
            <AsyncSelect
              instanceId="languages-select"
              className="nld-select"
              classNamePrefix="nld-select"
              placeholder={
                <div className="flex items-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 17.25H13.5L17.25 9.75L21 17.25ZM9.00001 11.9587C9.94492 11.1153 10.7007 10.0816 11.2178 8.92534C11.7348 7.76911 12.0014 6.51657 12 5.25H6.00001C5.99863 6.51657 6.26521 7.76911 6.78225 8.92534C7.29929 10.0816 8.05509 11.1153 9.00001 11.9587Z" fill="#1B4F58"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.09863 2.00488C9.32763 2.02757 9.54289 2.12883 9.70703 2.29297C9.89457 2.48051 10 2.73478 10 3V4.25H15C15.2652 4.25 15.5195 4.35543 15.707 4.54297C15.8946 4.73051 16 4.98478 16 5.25C16 5.51522 15.8946 5.76949 15.707 5.95703C15.5195 6.14457 15.2652 6.25 15 6.25H12.9473C12.7391 8.33062 11.8824 10.2915 10.498 11.8574C11.6539 12.646 12.9972 13.1163 14.3936 13.2236L16.3555 9.30273C16.4385 9.13675 16.5658 8.99702 16.7236 8.89941C16.8816 8.8018 17.0643 8.75 17.25 8.75C17.4355 8.75009 17.6176 8.80188 17.7754 8.89941C17.9332 8.99702 18.0605 9.13674 18.1436 9.30273L23.3936 19.8027C23.4698 19.9551 23.5066 20.1247 23.499 20.2949C23.4914 20.4651 23.4401 20.6305 23.3506 20.7754C23.2611 20.9203 23.136 21.04 22.9873 21.123C22.8385 21.2061 22.6704 21.2499 22.5 21.25C22.3143 21.2501 22.1326 21.1981 21.9746 21.1006C21.8165 21.003 21.6886 20.8634 21.6055 20.6973L20.3818 18.25H14.1172L12.8936 20.6973C12.7749 20.9345 12.5671 21.1154 12.3154 21.1992C12.0638 21.2829 11.7889 21.2632 11.5518 21.1445C11.3148 21.0259 11.1346 20.8178 11.0508 20.5664C11.0093 20.4418 10.9926 20.3097 11.002 20.1787C11.0113 20.0478 11.0467 19.9201 11.1055 19.8027L13.4434 15.126C11.8311 14.8701 10.3056 14.2235 8.99902 13.2422C7.38267 14.461 5.43617 15.1597 3.41699 15.2422L3 15.25C2.73478 15.25 2.48051 15.1446 2.29297 14.957C2.10543 14.7695 2 14.5152 2 14.25C2 13.9848 2.10543 13.7305 2.29297 13.543C2.48051 13.3554 2.73478 13.25 3 13.25C4.60816 13.2529 6.17645 12.7668 7.50098 11.8623C6.65392 10.9042 5.99628 9.79331 5.56934 8.58594C5.52404 8.46292 5.50266 8.33122 5.50781 8.2002C5.51303 8.06762 5.54552 7.93765 5.60156 7.81738C5.65768 7.69703 5.73667 7.58831 5.83496 7.49902C5.93325 7.40976 6.04867 7.34119 6.17383 7.29688C6.29897 7.25258 6.43192 7.23368 6.56445 7.24121C6.69694 7.24877 6.82701 7.28264 6.94629 7.34082C7.0655 7.39902 7.1723 7.48034 7.25977 7.58008C7.34625 7.67873 7.41191 7.79377 7.4541 7.91797L7.60449 8.30762C7.94258 9.12196 8.41514 9.87343 9 10.5342C10.0613 9.33284 10.736 7.84045 10.9355 6.25H3C2.73478 6.25 2.48051 6.14457 2.29297 5.95703C2.12883 5.79289 2.02757 5.57763 2.00488 5.34863L2 5.25C2 4.98478 2.10543 4.7305 2.29297 4.54297C2.48051 4.35543 2.73478 4.25 3 4.25H8V3C8 2.73478 8.10543 2.48051 8.29297 2.29297C8.4805 2.10543 8.73478 2 9 2L9.09863 2.00488ZM15.1182 16.25H19.3818L17.249 11.9854L15.1182 16.25Z" fill="#A0C6CD"/>
                  </svg>
                  <div className="ml-2.5">{t('search-languages')}</div>
                </div>
              }
              cacheOptions
              onChange={(e) => selectDropdown(e.value, 'languages')}
              defaultOptions={languageOptions.map(language => { return { value : language.id, label : language.name }})}
              loadOptions={loadLanguageOptions} />
          </div>
          <div className="mt-2.5">
            <AsyncSelect
              instanceId="treaties-select"
              className="nld-select"
              classNamePrefix="nld-select"
              placeholder={
                <div className="flex items-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.82208 4.99985L3.0379 13.6239L9.20685 19.7928C9.41709 20.0031 9.7025 20.1209 9.99982 20.1209C10.2972 20.1209 10.5825 20.0031 10.7928 19.7928C11.0031 19.5825 11.1209 19.2972 11.1209 18.9998C11.1209 18.7396 11.0306 18.4884 10.867 18.2889L10.7928 18.2069L10.2928 17.7069C9.90244 17.3163 9.90233 16.6833 10.2928 16.2928C10.6588 15.9268 11.2379 15.9043 11.6307 16.2245L11.7068 16.2928L13.7068 18.2928C13.8109 18.3969 13.9351 18.4796 14.0711 18.536C14.207 18.5922 14.3528 18.6209 14.4998 18.6209C14.6469 18.6209 14.7926 18.5922 14.9285 18.536C15.0646 18.4796 15.1887 18.3969 15.2928 18.2928C15.3969 18.1887 15.4796 18.0646 15.5359 17.9286C15.5922 17.7926 15.6209 17.6469 15.6209 17.4998C15.6209 17.3528 15.5922 17.207 15.5359 17.0711C15.4938 16.9693 15.4366 16.8738 15.367 16.7889L15.3006 16.7157L13.2928 14.7079C12.9023 14.3174 12.9024 13.6834 13.2928 13.2928C13.6832 12.9026 14.3163 12.9027 14.7068 13.2928L17.2068 15.7928C17.4171 16.0029 17.7026 16.1219 17.9998 16.1219C18.2971 16.1219 18.5825 16.003 18.7928 15.7928C19.0028 15.5827 19.1207 15.2979 19.1209 15.0008C19.1209 14.7036 19.0029 14.4181 18.7928 14.2079L14.9129 10.327C14.5379 9.9526 14.0297 9.74302 13.4998 9.74301C12.9699 9.74307 12.4617 9.95349 12.0867 10.328L12.0858 10.327L11.2068 11.2079C10.6215 11.7929 9.8274 12.1219 8.99982 12.1219C8.17222 12.1219 7.37806 11.793 6.79279 11.2079C6.20761 10.6227 5.87893 9.82836 5.87872 9.00082C5.87872 8.17306 6.20751 7.37816 6.79279 6.79282L8.58673 4.99985H3.82208Z" fill="#1B4F58"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5682 2.05061C15.0671 1.8659 16.5852 2.18615 17.8817 2.96077L18.3514 3.24104L18.5018 3.31624C18.6515 3.37627 18.8142 3.39917 18.9754 3.38265L19.0672 3.36897L20.0115 3.17854L20.0037 3.09065L19.9998 2.98811C20.0052 2.48149 20.3936 2.05082 20.909 2.00374C21.4247 1.95685 21.8847 2.31074 21.9813 2.80843L21.9959 2.90901L22.9959 13.909C23.0214 14.1888 22.9276 14.4672 22.7381 14.6746C22.5487 14.8819 22.2806 14.9998 21.9998 14.9998H21.1209C21.1207 15.8274 20.792 16.6227 20.2069 17.2078C19.6216 17.7929 18.8274 18.1219 17.9998 18.1219C17.8529 18.1219 17.7071 18.111 17.5633 18.0907C17.5236 18.2969 17.4644 18.4992 17.3836 18.6942C17.2268 19.0729 16.9967 19.417 16.7069 19.7069C16.417 19.9967 16.0729 20.2268 15.6942 20.3836C15.3155 20.5404 14.9096 20.6209 14.4998 20.6209C14.09 20.6209 13.6841 20.5404 13.3055 20.3836C13.1617 20.3241 13.0232 20.2536 12.8905 20.1737C12.735 20.5566 12.5048 20.9089 12.2069 21.2069C11.6215 21.7922 10.8276 22.1209 9.99983 22.1209C9.17208 22.1209 8.37811 21.7922 7.79279 21.2069L1.29279 14.7069C1.08306 14.497 0.976871 14.2045 1.00373 13.909L2.00373 2.90901C2.05393 2.35928 2.54086 1.95388 3.09065 2.00374C3.60999 2.05109 4.00017 2.48815 3.99983 2.99983H10.8553C11.6768 2.49691 12.6002 2.16993 13.5682 2.05061ZM3.82209 4.99983L3.03791 13.6239L9.20686 19.7928C9.4171 20.003 9.70251 20.1209 9.99983 20.1209C10.2972 20.1209 10.5825 20.0031 10.7928 19.7928C11.0031 19.5825 11.1209 19.2972 11.1209 18.9998C11.1209 18.7396 11.0306 18.4884 10.867 18.2889L10.7928 18.2069L10.2928 17.7069C9.90244 17.3163 9.90234 16.6833 10.2928 16.2928C10.6589 15.9267 11.2379 15.9043 11.6307 16.2244L11.7069 16.2928L13.7069 18.2928C13.8109 18.3969 13.9352 18.4796 14.0711 18.536C14.207 18.5922 14.3528 18.6209 14.4998 18.6209C14.6469 18.6209 14.7926 18.5922 14.9285 18.536C15.0646 18.4796 15.1887 18.3969 15.2928 18.2928C15.3969 18.1887 15.4796 18.0646 15.536 17.9285C15.5922 17.7926 15.6209 17.6469 15.6209 17.4998C15.6209 17.3528 15.5922 17.207 15.536 17.0711C15.4938 16.9693 15.4366 16.8738 15.367 16.7889L15.3006 16.7157L13.2928 14.7078C12.9023 14.3174 12.9024 13.6833 13.2928 13.2928C13.6832 12.9025 14.3163 12.9027 14.7069 13.2928L17.2069 15.7928C17.4171 16.0029 17.7026 16.1218 17.9998 16.1219C18.2971 16.1219 18.5825 16.003 18.7928 15.7928C19.0028 15.5827 19.1207 15.2979 19.1209 15.0008C19.1209 14.7036 19.0029 14.4181 18.7928 14.2078L14.9129 10.327C14.5379 9.95258 14.0297 9.74301 13.4998 9.743C12.9699 9.74306 12.4617 9.95348 12.0867 10.328L12.0858 10.327L11.2069 11.2078C10.6216 11.7929 9.8274 12.1219 8.99983 12.1219C8.17223 12.1218 7.37807 11.793 6.79279 11.2078C6.20762 10.6227 5.87894 9.82835 5.87873 9.00081C5.87873 8.17305 6.20752 7.37815 6.79279 6.7928L8.58674 4.99983H3.82209ZM16.8572 4.67854C15.9425 4.13162 14.8711 3.90568 13.8133 4.03597C12.7555 4.16632 11.7711 4.64564 11.0164 5.39827L8.20686 8.20784C7.99687 8.41808 7.87873 8.70365 7.87873 9.00081C7.87894 9.29774 7.99698 9.58274 8.20686 9.7928C8.41707 10.0029 8.7026 10.1218 8.99983 10.1219C9.29714 10.1219 9.58253 10.003 9.79279 9.7928L10.6727 8.91292C11.4226 8.16395 12.4399 7.74306 13.4998 7.743C14.4937 7.74301 15.4498 8.11265 16.1834 8.7762L16.327 8.91292L20.2069 12.7928C20.2731 12.8591 20.3357 12.9284 20.3953 12.9998H20.9041L20.1932 5.18147L19.4569 5.33089L19.453 5.33186C18.7229 5.47555 17.9655 5.34209 17.328 4.95882L16.8582 4.67952L16.8572 4.67854Z" fill="#A0C6CD"/>
                  </svg>
                  <div className="ml-2.5">{t('search-treaties')}</div>
                </div>
              }
              cacheOptions
              onChange={(e) => selectDropdown(e.value, 'treaties')}
              defaultOptions={treatyOptions.map(treaty => { return { value : treaty.id, label : treaty.name }})}
              loadOptions={loadTreatyOptions} />
          </div>
        </div>

        {selectedFeatures.length > 0 ?
          <div className={
            !isMobile() ? 
              `nld-text-sm nld-text-teal-100 m-4 mt-0 nld-bg-blue-800-10 rounded-xl p-2.5 relative transition ease-in-out ${resultsSlided ? 'w-full -translate-x-64' : ''}`
            :
              `fixed h-[33vh] w-full bottom-0 nld-text-sm nld-text-teal-100 bg-white rounded-t-xl p-2.5 z-[999] transition ease-in-out ${resultsSlided ? 'translate-y-[33vh]' : ''}`
          }>
            <div className="absolute top-0 right-0 block md:hidden p-1" onClick={() => {
              if(isMobile()) {
                setResultsSlided(!resultsSlided)
              } else {
                setSelectedFeatures([])
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
                  {selectedFeatures.map(feature => {
                    return (
                      <li key={`selected-features-${feature.properties.Slug}`} className="flex items-center mt-2.5">
                        <input type="checkbox" checked={toggledFeatures.indexOf(feature.properties.Slug) === -1} className="mr-1" onChange={() => nationToggle(feature.properties.Slug)} />
                        <Link className="nld-text-grey-500 flex items-center" prefetch={false} href={process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'preview' ? feature.properties.description.substring(feature.properties.description.indexOf('/')) : feature.properties.description} target="_blank">
                          {feature.properties.Name}
                          <svg className="ml-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.33301 2.66699C7.70109 2.66699 7.99982 2.96497 8 3.33301C8 3.7012 7.7012 4 7.33301 4H3.33301C3.15639 4.00009 2.98724 4.07047 2.8623 4.19531C2.73728 4.32034 2.66699 4.49018 2.66699 4.66699V12.667C2.66708 12.8437 2.73736 13.0127 2.8623 13.1377C2.98725 13.2626 3.15631 13.3329 3.33301 13.333H11.333C11.5098 13.333 11.6797 13.2627 11.8047 13.1377C11.9295 13.0128 11.9999 12.8436 12 12.667V8.66699C12 8.2988 12.2988 8 12.667 8C13.035 8.00018 13.333 8.29891 13.333 8.66699V12.667C13.3329 13.1973 13.1221 13.7061 12.7471 14.0811C12.372 14.4559 11.8633 14.667 11.333 14.667H3.33301C2.80269 14.6669 2.29394 14.4561 1.91895 14.0811C1.54395 13.7061 1.33309 13.1973 1.33301 12.667V4.66699C1.33301 4.13671 1.54408 3.62797 1.91895 3.25293C2.29394 2.87793 2.80269 2.66708 3.33301 2.66699H7.33301ZM14 1.33301C14.0426 1.33301 14.085 1.33856 14.127 1.34668C14.1505 1.35122 14.1727 1.35926 14.1953 1.36621C14.2155 1.3724 14.2362 1.37662 14.2559 1.38477C14.2762 1.39322 14.2943 1.40568 14.3135 1.41602C14.332 1.42599 14.3514 1.43443 14.3691 1.44629C14.4423 1.49514 14.5049 1.55773 14.5537 1.63086C14.5656 1.6486 14.574 1.66797 14.584 1.68652C14.5943 1.70575 14.6068 1.72384 14.6152 1.74414C14.6234 1.76375 14.6276 1.78453 14.6338 1.80469C14.6529 1.86677 14.667 1.93165 14.667 2V6C14.667 6.36819 14.3682 6.66699 14 6.66699C13.6318 6.66699 13.333 6.36819 13.333 6V3.61035L8.47168 8.47168C8.21133 8.73201 7.78866 8.73202 7.52832 8.47168C7.26799 8.21134 7.26799 7.78867 7.52832 7.52832L12.3896 2.66699H10C9.63181 2.66699 9.33301 2.36819 9.33301 2C9.33301 1.63181 9.63181 1.33301 10 1.33301H14Z" fill="#29646F"/>
                          </svg>
                        </Link>
                      </li>)
                  })}
                </ul>
              </div>
             : 
              <div>
                <p className="font-italic md:font-normal mb-1.5">{t('contact-nations')}</p>
                <ul className="list-none">
                  {selectedFeatures.map(feature => {
                    const icon = feature.layer.id !== "greetings" ? "↗" : "🕪";
                    return (
                      <li key={`selected-features-${feature.properties.Slug}`} className="mt-2.5">
                        <input type="checkbox" checked={toggledFeatures.indexOf(feature.properties.Slug) === -1} className="mr-1" onChange={() => nationToggle(feature.properties.Slug)} />
                        <Link className="font-semibold nld-text-teal-100 hover:underline" prefetch={false} href={process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'preview' ? feature.properties.description.substring(feature.properties.description.indexOf('/')) : feature.properties.description} target="_blank">{feature.properties.Name} {icon}</Link>
                      </li>)
                  })}
                </ul>
              </div>
            }
          </div>
        : false}
      </div>
    )
}
