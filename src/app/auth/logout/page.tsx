"use client"
import { signOut } from "next-auth/react";

export default function Logout() {

  return (
    <div className="bg-blue-900 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Logout</h2>
            <div className="!mt-8">
              <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
