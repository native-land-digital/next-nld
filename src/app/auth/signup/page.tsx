"use client"
import { useState, useEffect } from 'react';
import { signIn } from "next-auth/react";
import { navigate } from '@/lib/actions'

export default function Signup() {

  const [ email, setEmail ] = useState("");
  const [ name, setName ] = useState("");
  const [ organization, setOrganization ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState(false);

  const doSignUp = async () => {
    setError(false);
    fetch('/api/users', {
      method : "POST",
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        email : email,
        name : name,
        organization : organization,
        password : password
      })
    }).then(resp => resp.json()).then(results => {
      console.log(results)
      if(results.error) {
        setError(results.error);
      } else {
        setError(false);
        doSignIn();
      }
    });
  }

  const doSignIn = async () => {
    await signIn('credentials', {
      email : email,
      password : password,
      callbackUrl : '/admin'
    });
  }

  return (
    <div className="bg-blue-900 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign up</h2>
            <p className="text-gray-800 text-sm mt-2.5">Welcome to Native Land! With an account, you can gain access to our API, or join our volunteer team.</p>
            <hr className="border-slate-400 mb-4 mt-4 w-6/12 m-auto" />
            <div>
              <label className="text-gray-800 text-sm mb-1.5 block">Name</label>
              <div className="relative flex items-center">
                <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter name" />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-1.5 block mt-3">Email</label>
              <div className="relative flex items-center">
                <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter email" />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-1.5 block mt-3">Password</label>
              <div className="relative flex items-center">
                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-1.5 block mt-3">Organization</label>
              <p className="text-gray-800 text-xs mb-1.5">If you are part of an organization using Native Land, please tell us here.</p>
              <div className="relative flex items-center">
                <input value={organization} onChange={(e) => setOrganization(e.target.value)} name="organization" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter organization" />
              </div>
            </div>

            <div className="!mt-8">
              <button onClick={() => doSignUp()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Sign up
              </button>
            </div>

            {error ?
              <div className="mt-3">
                <div className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-red-500 break-all">
                  {error}
                </div>
              </div>
            : false }
          </div>
        </div>
      </div>
    </div>
  );
}
