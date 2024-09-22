export default function AdminHeader({ title, breadcrumbs }) {
  return (
    <div className="bg-blue-900 h-60 flex items-center py-6 px-10 md:px-0">
      <div className="w-full md:w-2/3 m-auto">
        <h2 className="font-semibold text-3xl">{title}</h2>
        <div className="text-sm mt-1.5">
          <a className="text-white hover:text-slate-300" href="/">Home</a>
          {breadcrumbs.map(crumb => {
            return (<span key={`crumb-${crumb}`}><span className="ml-2 mr-1">/</span> {crumb}</span>)
          })}
        </div>
      </div>
    </div>
  );
}
