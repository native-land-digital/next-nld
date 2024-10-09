export default async function AuthLayout({ children }) {

  return (
    <div className="bg-blue-900 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
