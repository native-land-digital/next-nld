import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';
import { getDictionary } from '@/i18n/dictionaries';

export default async function Page({ params: { lang } }) {

  const dict = await getDictionary(lang, 'about/how-it-works')

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={"How It Works"} breadcrumbs={["About", "How It Works"]} />
      <div className="grid gap-5 grid-cols-3 min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black static-page">
        <Sidebar />
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <h2>{dict['how-to-use-header']}</h2>
          <div dangerouslySetInnerHTML={{ __html : dict['how-to-use']}} />
          <h2>{dict['organization-header']}</h2>
          <div dangerouslySetInnerHTML={{ __html : dict['organization']}} />
          <h2>{dict['technology-header']}</h2>
          <div dangerouslySetInnerHTML={{ __html : dict['technology']}} />
          <h2>{dict['funding-header']}</h2>
          <div dangerouslySetInnerHTML={{ __html : dict['funding']}} />
        </div>
      </div>
    </div>
  );
}
