import prisma from "@/lib/db/prisma";
import Image from "next/image";

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
      category : true,
      media : true,
      updatedAt : true
    },
    orderBy : {
      updatedAt : 'asc'
    },
    take : 3
  });

  // const dict = await getDictionary(lang, 'front-page')

  return (
    <div className="font-[sans-serif] bg-white py-10 text-center">
      <div className="w-full md:w-3/4 m-auto">
        <section>
          <h2 className="text-6xl font-bold"><span className="text-blue-600 underline underline-offset-2 decoration-yellow-600/30 decoration-[15px]">Welcome.</span> <span className="text-black">We are glad you are here.</span></h2>
          <p className="text-xl text-gray-400 my-8">Native Land is an app to help map Indigenous territories, treaties, and languages.</p>
          <p className="bg-blue-600/20 px-4 py-2.5 rounded inline font-bold">Dont hesitate to <a href="/contact">get in touch</a> if you see an error!</p>
        </section>
        <section>
          <div className="grid grid-cols-2 pad-5">
            <div>
              <h3>Our Mission</h3>
              <p>We strive to map Indigenous lands in a way that changes, challenges, and improves the way people see history and the present day. We hope to strengthen the spiritual bonds that people have with the land, its people, and its meaning.</p>
              <a href="/about/why-it-matters">Read more</a>
            </div>
            <div>
              <Image src={Mission} alt="Mission" className="w-full h-auto" />
            </div>
          </div>
        </section>
        <section>
          <div className="bg-blue-600">
            <h3>How It Works</h3>
            <div className="w-2/3">
              <div className="grid grid-cols-3 pad-2.5">
                <div className="bg-white rounded">
                  <Image src={Mapping} alt="Mapping" />
                  <h4>Mapping</h4>
                  <p>We strive to map Indigenous territories, treaties, and languages across the world in a way that goes beyond colonial ways of thinking in order to better represent how Indigenous people want to see themselves.</p>
                </div>
                <div className="bg-white rounded">
                  <Image src={Education} alt="Education" />
                  <h4>Education</h4>
                  <p>We strive to map Indigenous territories, treaties, and languages across the world in a way that goes beyond colonial ways of thinking in order to better represent how Indigenous people want to see themselves.</p>
                </div>
                <div className="bg-white rounded">
                  <Image src={Community} alt="Community" />
                  <h4>Community</h4>
                  <p>We strive to map Indigenous territories, treaties, and languages across the world in a way that goes beyond colonial ways of thinking in order to better represent how Indigenous people want to see themselves.</p>
                </div>
              </div>
            </div>
            <p>Got questions? <span>Get in touch with us</span></p>
          </div>
        </section>
        <section>
          <h3>A few of our partners and supporters:</h3>
          <div className="grid grid-cols-5 pad-5">
            <Image src={Kalliopeia} alt="Kalliopeia logo" />
            <Image src={Mapbox} alt="Mapbox logo" />
            <Image src={DigitalDemocracy} alt="Digital Democracy logo" />
            <Image src={Mapster} alt="Mapster Technology Inc logo" />
            <Image src={Vancity} alt="Vancity logo" />
          </div>
        </section>
        <section>
          <h3>Latest map updates</h3>
          <div className="grid grid-cols-5 pad-5">
            {latestUpdates.map(polygon => {
              return (
                <div key={`polygon-${polygon.id}`}>
                  <p>{polygon.category}</p>
                  <h5>{polygon.name}</h5>
                  <p>{new Date(polygon.updatedAt).toLocaleDateString()}</p>
                </div>
              )
            })}
          </div>
        </section>
        <section>
          <div className="grid grid-cols-2 pad-5">
            <div>
              <Image src={Disclaimer} alt="disclaimer" className="w-full h-auto" />
            </div>
            <div>
              <h3>Disclaimer</h3>
              <p>
                This map does not represent or intend to represent official or legal boundaries of any Indigenous nations. To learn about definitive boundaries, contact the nations in question.
                Also, this map is not perfect — it is a work in progress with tons of contributions from the community. Please send us fixes if you find errors.
                We strive to represent nations and Indigenous people on their own terms. When there are conflicts or issues with our information, we try to fix things as soon as possible with the input of all parties involved.
              </p>
              <a href="/contact">Get in touch</a>
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-3 pad-5">
            <div>
              <h5>Map Lists</h5>
              <p>Explore the full lists of the shapes we curate from around the world.</p>
            </div>
            <div>
              <h5>Open Map Data</h5>
              <p>We provide geoJSONs and a comprehensive API for free.</p>
            </div>
            <div>
              <h5>Education</h5>
              <p>Need help using Native Land in the classroom or office? Check out our guides.</p>
            </div>
            <div>
              <h5>Land Acknowledgement</h5>
              <p>Take a look at our Land Acknowledgement page to learn more about doing it right.</p>
            </div>
            <div>
              <h5>Research references</h5>
              <p>All our research and maps are documented on our territory, language, and treaty reference pages.</p>
            </div>
            <div>
              <h5>Blogs and articles</h5>
              <p>Keep up to date with our latest thoughts and discussions.</p>
            </div>
          </div>
        </section>
        <section>
          <button>You can help support us in many ways</button>
          <div className="grid grid-cols-2 pad-5">
            <div className="grid grid-cols-2">
              <div>
                <h5>Patreon</h5>
                <p>Come join us on Patreon and support our organization (and get some perks)!</p>
                <a href="">Learn more</a>
              </div>
              <div>
                <Image src={Patreon} alt="patreon" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <h5>Supporters Circle</h5>
                <p>Join our new Supporter’s Circle and help be a part of the connections between Indigenous communities.</p>
                <a href="">Learn more</a>
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
