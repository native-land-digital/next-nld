import AdminHeader from '@/components/dashboard/header'
import AdminMenu from '@/components/dashboard/menu'

export default function Page() {

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <AdminHeader title={"Dashboard"} breadcrumbs={["Dashboard"]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t h-screen shadow-lg p-4 mt-5">
          <p>Do we want content here, or just redirect to a sub page?</p>
        </div>
      </div>
    </div>
  );
}
