import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'

import UpdateMapbox from '@/components/dashboard/update-mapbox';

export default function Page() {

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={"Mapbox"} breadcrumbs={["Dashboard", "Mapbox"]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <UpdateMapbox />
        </div>
      </div>
    </div>
  );
}
