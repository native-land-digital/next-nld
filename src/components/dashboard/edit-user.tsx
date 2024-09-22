'use client'
import { useState, useEffect } from 'react';
import { possiblePermissions } from '@/lib/auth/permissions';
import { toast } from 'react-toastify';

export default function EditUser({ user }) {

  const [ name, setName ] = useState(user.name);
  const [ email, setEmail ] = useState(user.email);
  const [ password, setPassword ] = useState('');
  const [ permissions, setPermissions ] = useState(user.permissions);
  const [ organization, setOrganization ] = useState(user.organization);

  const savePermissions = (checked, permission) => {
    let newPermissions = JSON.parse(JSON.stringify(permissions));
    if(checked) {
      newPermissions.push(permission);
    } else {
      newPermissions.splice(newPermissions.indexOf(permission), 1);
    }
    setPermissions(newPermissions)
  }

  const saveUser = () => {
    fetch(`/api/users/${user.id}`, {
      method : "PATCH",
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        email : email,
        name : name,
        organization : organization,
        password : password,
        permissions : permissions
      })
    }).then(resp => resp.json()).then(results => {
      console.log(results)
      if(results.error) {
        toast(results.error)
      } else {
        toast("User saved successfully")
      }
    });
  }

  return (
    <div>
      <a href="/dashboard/users"><div className="inline-block rotate-180 mr-2.5 mb-2.5">➜</div>Back</a>
      <h2 className="font-semibold text-3xl">{user.name}</h2>
      <p className="text-xs mt-1" suppressHydrationWarning>User created {new Date(user.createdAt).toLocaleString()}</p>
      <hr className="mt-3 mb-3" />
      <div className="w-full md:w-1/2">

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Name</label>
          <div className="relative flex items-center">
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter new name" />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Email</label>
          <div className="relative flex items-center">
            <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter new email" />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Password</label>
          <div className="relative flex items-center">
            <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter new password" />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Organization</label>
          <div className="relative flex items-center">
            <input value={organization} onChange={(e) => setOrganization(e.target.value)} name="name" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter new name" />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">API Key</label>
          <div className="relative flex items-center">
            <input value={user.api_key} name="api_key" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" disabled={true} />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Permissions</label>
          <div className="relative">
            <p className="text-gray-500 text-xs mb-2.5">Users will need to log out and back in before any permission changes take effect.</p>
            {possiblePermissions.map(permission => {
              return (
                <div key={`checkbox-${permission}`}>
                  <label htmlFor={permission} className='capitalize text-sm'>
                    <input id={permission} type="checkbox" checked={permissions.includes(permission)} name={permission} onChange={(e) => savePermissions(e.target.checked, permission)} className="mr-1.5" />
                    {permission}
                  </label>
                </div>
              )
            })}
          </div>
        </div>

        <div className="!mt-8">
          <button onClick={() => saveUser()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Save Changes
          </button>
        </div>
        
      </div>
    </div>
  );
}
