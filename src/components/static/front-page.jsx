import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from 'next/link'

import { getDictionary } from '@/i18n/dictionaries';
import Mission from '@/public/images/mission.webp'
import Mapping from '@/public/images/physical-world-map.webp'
import Education from '@/public/images/stacked-paper-sheets.webp'
import Community from '@/public/images/wildflower.webp'
import Kalliopeia from '@/public/images/kalliopeia-logo.webp'
import Mapbox from '@/public/images/mapbox-logo.webp'
import DigitalDemocracy from '@/public/images/Digital-Democracy.webp'
import Mapster from '@/public/images/mapster-tech-logo.webp'
import Vancity from '@/public/images/vancity-logo.webp'
import Disclaimer from '@/public/images/disclaimer-3.webp'
import Patreon from '@/public/images/patreon.webp'
import SupportersCircle from '@/public/images/black-circle.webp'

export default async function FrontPage({ lang }) {

  const latestUpdates = await prisma.polygon.findMany({
    select : {
      id : true,
      name : true,
      slug : true,
      category : true,
      media : true,
      updatedAt : true
    },
    orderBy : {
      updatedAt : 'asc'
    },
    take : 5
  });

  const dict = await getDictionary(lang, 'front-page')

  return (
    <div className="font-[sans-serif] bg-white py-10 text-center">
      <div className="m-auto">
        <section className="w-full md:w-3/4 m-auto my-5">
          <h2 className="text-6xl font-bold"><span className="text-blue-600 underline underline-offset-2 decoration-yellow-600/30 decoration-[15px]">{dict["welcome"]}</span> <span className="text-black">{dict["welcome-glad"]}</span></h2>
          <p className="text-xl text-gray-500 my-8">{dict["welcome-blurb"]}</p>
          <p className="bg-blue-400/20 px-4 py-2.5 rounded inline font-bold text-blue-600"><span dangerouslySetInnerHTML={{ __html : dict["welcome-contact"] }} /></p>
        </section>
        <section className="w-full md:w-3/4 m-auto my-24">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col justify-center align-center text-black text-left p-2.5">
              <h3 className="text-4xl font-bold mb-5">{dict["our-mission-header"]}</h3>
              <p className="text-slate-400 mr-16 mb-5">{dict["our-mission"]}</p>
              <Link className="text-blue-600" href="/about/why-it-matters">{dict["our-mission-link"]}</Link>
            </div>
            <div>
              <Image src={Mission} alt="Mission" className="w-full h-auto" />
            </div>
          </div>
        </section>
        <section>
          <div className="bg-blue-900 rounded">
            <h3 className="text-4xl font-bold py-16">{dict["how-it-works-header"]}</h3>
            <div className="w-full md:w-3/4 m-auto">
              <div className="grid grid-cols-3 gap-5 text-black">
                <div className="bg-white rounded pb-2.5">
                  <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
                    <Image className="w-full" src={Mapping} alt="Mapping" />
                  </div>
                  <h4 className="text-xl font-bold mb-2.5 mt-5">{dict["mapping-header"]}</h4>
                  <p className="p-5 text-slate-500"><span dangerouslySetInnerHTML={{ __html : dict["mapping"] }} /></p>
                </div>
                <div className="bg-white rounded pb-2.5">
                  <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
                    <Image src={Education} alt="Education" />
                  </div>
                  <h4 className="text-xl font-bold mb-2.5 mt-5">{dict["education-header"]}</h4>
                  <p className="p-5 text-slate-500"><span dangerouslySetInnerHTML={{ __html : dict["education"] }} /></p>
                </div>
                <div className="bg-white rounded pb-2.5">
                  <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
                    <Image src={Community} alt="Community" />
                  </div>
                  <h4 className="text-xl font-bold mb-2.5 mt-5">{dict["community-header"]}</h4>
                  <p className="p-5 text-slate-500"><span dangerouslySetInnerHTML={{ __html : dict["community"] }} /></p>
                </div>
              </div>
            </div>
            <p className="pt-12 pb-12"><span dangerouslySetInnerHTML={{ __html : dict["how-it-works-link"] }} /></p>
          </div>
        </section>
        <section className="w-full md:w-3/4 m-auto my-24">
          <h3 className="text-black text-3xl font-bold pb-16">{dict["partners-supporters"]}</h3>
          <div className="grid grid-cols-5 pad-5">
            <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
              <Link href="https://kalliopeia.org/"><Image className="w-full" src={Kalliopeia} alt="Kalliopeia logo" /></Link>
            </div>
            <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
              <Link href="https://mapbox.com/"><Image src={Mapbox} alt="Mapbox logo" /></Link>
            </div>
            <div className="place-center w-1/2 m-auto mt-5 h-30 overflow-hidden pt-5">
              <Link href="https://www.digital-democracy.org/"><Image src={DigitalDemocracy} alt="Digital Democracy logo" /></Link>
            </div>
            <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
              <Link href="https://mapster.me/"><Image src={Mapster} alt="Mapster Technology Inc logo" /></Link>
            </div>
            <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
              <Link href="https://www.vancity.com/"><Image src={Vancity} alt="Vancity logo" /></Link>
            </div>
          </div>
        </section>
        <section className="w-full md:w-3/4 m-auto my-24 text-black">
          <h3 className="text-3xl font-bold pb-16">{dict["latest-updates"]}</h3>
          <div className="grid grid-cols-5 pad-5">
            {latestUpdates.map(polygon => {
              return (
                <div key={`polygon-${polygon.id}`}>
                  {polygon.media.length > 0 ?
                    <Link href={`maps/${polygon.category}/${polygon.slug}`}>
                      <div className="w-1/2 m-auto mt-5 h-[100px] bg-cover mb-2.5" style={{backgroundImage : `url(${polygon.media[0].url})`}}></div>
                    </Link>
                  : false}
                  <p className="uppercase text-gray-300 text-xs pb-2.5">{polygon.category}</p>
                  <Link href={`maps/${polygon.category}/${polygon.slug}`}>
                    <h5 className="text-xl font-bold">{polygon.name}</h5>
                  </Link>
                  <p className="text-sm pt-2.5">{new Date(polygon.updatedAt).toLocaleDateString()}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="w-full md:w-3/4 m-auto my-24">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Image src={Disclaimer} alt="disclaimer" className="w-full h-auto" />
            </div>
            <div className="flex flex-col justify-center align-center text-black text-left p-2.5">
              <h3 className="text-4xl font-bold mb-5">{dict["disclaimer-header"]}</h3>
              <p className="text-slate-400 mr-16 mb-5">{dict["disclaimer"]}</p>
              <Link className="text-blue-600" href="/contact">{dict["disclaimer-link"]}</Link>
            </div>
          </div>
        </section>
        <section className="w-full md:w-3/4 m-auto my-24">
          <div className="grid grid-cols-3 gap-5 text-black text-left">
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.302 11.35L12.002 20.55H21.202C21.802 20.55 22.202 19.85 21.902 19.35L17.302 11.35Z" fill="#1e88e5"></path>
                  <path opacity="0.3" d="M12.002 20.55H2.802C2.202 20.55 1.80202 19.85 2.10202 19.35L6.70203 11.45L12.002 20.55ZM11.302 3.45L6.70203 11.35H17.302L12.702 3.45C12.402 2.85 11.602 2.85 11.302 3.45Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{dict["mobile-apps-header"]}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : dict["mobile-apps"] }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" d="M21 2H13C12.4 2 12 2.4 12 3V13C12 13.6 12.4 14 13 14H21C21.6 14 22 13.6 22 13V3C22 2.4 21.6 2 21 2ZM15.7 8L14 10.1V5.80005L15.7 8ZM15.1 4H18.9L17 6.40002L15.1 4ZM17 9.59998L18.9 12H15.1L17 9.59998ZM18.3 8L20 5.90002V10.2L18.3 8ZM9 2H3C2.4 2 2 2.4 2 3V21C2 21.6 2.4 22 3 22H9C9.6 22 10 21.6 10 21V3C10 2.4 9.6 2 9 2ZM4.89999 12L4 14.8V9.09998L4.89999 12ZM4.39999 4H7.60001L6 8.80005L4.39999 4ZM6 15.2L7.60001 20H4.39999L6 15.2ZM7.10001 12L8 9.19995V14.9L7.10001 12Z" fill="#1e88e5"></path>
                  <path d="M21 18H13C12.4 18 12 17.6 12 17C12 16.4 12.4 16 13 16H21C21.6 16 22 16.4 22 17C22 17.6 21.6 18 21 18ZM19 21C19 20.4 18.6 20 18 20H13C12.4 20 12 20.4 12 21C12 21.6 12.4 22 13 22H18C18.6 22 19 21.6 19 21Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{dict["open-data-header"]}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : dict["open-data"] }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M4.85714 1H11.7364C12.0911 1 12.4343 1.12568 12.7051 1.35474L17.4687 5.38394C17.8057 5.66895 18 6.08788 18 6.5292V19.0833C18 20.8739 17.9796 21 16.1429 21H4.85714C3.02045 21 3 20.8739 3 19.0833V2.91667C3 1.12612 3.02045 1 4.85714 1ZM7 13C7 12.4477 7.44772 12 8 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H8C7.44772 14 7 13.5523 7 13ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16H8Z" fill="#1e88e5"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.85714 3H14.7364C15.0911 3 15.4343 3.12568 15.7051 3.35474L20.4687 7.38394C20.8057 7.66895 21 8.08788 21 8.5292V21.0833C21 22.8739 20.9796 23 19.1429 23H6.85714C5.02045 23 5 22.8739 5 21.0833V4.91667C5 3.12612 5.02045 3 6.85714 3ZM7 13C7 12.4477 7.44772 12 8 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H8C7.44772 14 7 13.5523 7 13ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16H8Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{dict["education-header"]}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : dict["education"] }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="#1e88e5"></path>
                  <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{dict["land-acknowledgement-header"]}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : dict["land-acknowledgement"] }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15 19.5229C15 20.265 15.9624 20.5564 16.374 19.9389L22.2227 11.166C22.5549 10.6676 22.1976 10 21.5986 10H17V4.47708C17 3.73503 16.0376 3.44363 15.626 4.06106L9.77735 12.834C9.44507 13.3324 9.80237 14 10.4014 14H15V19.5229Z" fill="#1e88e5"></path>
                  <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M3 6.5C3 5.67157 3.67157 5 4.5 5H9.5C10.3284 5 11 5.67157 11 6.5C11 7.32843 10.3284 8 9.5 8H4.5C3.67157 8 3 7.32843 3 6.5ZM3 18.5C3 17.6716 3.67157 17 4.5 17H9.5C10.3284 17 11 17.6716 11 18.5C11 19.3284 10.3284 20 9.5 20H4.5C3.67157 20 3 19.3284 3 18.5ZM2.5 11C1.67157 11 1 11.6716 1 12.5C1 13.3284 1.67157 14 2.5 14H6.5C7.32843 14 8 13.3284 8 12.5C8 11.6716 7.32843 11 6.5 11H2.5Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{dict["research-header"]}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : dict["research"] }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" d="M5 8.04999L11.8 11.95V19.85L5 15.85V8.04999Z" fill="#1e88e5"></path>
                  <path d="M20.1 6.65L12.3 2.15C12 1.95 11.6 1.95 11.3 2.15L3.5 6.65C3.2 6.85 3 7.15 3 7.45V16.45C3 16.75 3.2 17.15 3.5 17.25L11.3 21.75C11.5 21.85 11.6 21.85 11.8 21.85C12 21.85 12.1 21.85 12.3 21.75L20.1 17.25C20.4 17.05 20.6 16.75 20.6 16.45V7.45C20.6 7.15 20.4 6.75 20.1 6.65ZM5 15.85V7.95L11.8 4.05L18.6 7.95L11.8 11.95V19.85L5 15.85Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{dict["blogs-header"]}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : dict["blogs"] }} /></p>
            </div>
          </div>
        </section>
        <section className="w-full md:w-3/4 m-auto my-24">
          <Link href="/support-us" className="py-2.5 px-5 bg-blue-600 rounded mb-5 text-white">{dict["support-button"]}</Link>
          <div className="grid grid-cols-2 gap-5 mt-12 text-black">
            <div className="grid grid-cols-2 rounded shadow-lg">
              <div className="flex flex-col justify-center text-left p-5">
                <h5 className="text-xl font-bold mt-5">{dict["patreon-header"]}</h5>
                <p className="mt-5 mb-5 text-slate-500">{dict["patreon"]}</p>
                <Link href="">{dict["patreon-link"]}</Link>
              </div>
              <div>
                <Image className="w-full h-auto p-7" src={Patreon} alt="patreon" />
              </div>
            </div>
            <div className="grid grid-cols-2 rounded shadow-lg">
              <div className="flex flex-col justify-center text-left p-5">
                <h5 className="text-xl font-bold mt-5">{dict["supporters-circle-header"]}</h5>
                <p className="mt-5 mb-5 text-slate-500">{dict["supporters-circle"]}</p>
                <Link href="">{dict["supporters-circle-link"]}</Link>
              </div>
              <div>
                <Image src={SupportersCircle} alt="supporters-circle" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
