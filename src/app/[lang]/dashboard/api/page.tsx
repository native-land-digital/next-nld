import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'

export default function Page() {

  return (
    <div className="font-[sans-serif] bg-white">
      <SubHeader title={"API"} />
      <div className="h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t h-screen shadow-lg p-4 mt-5">

        </div>
      </div>
    </div>
  );
}
