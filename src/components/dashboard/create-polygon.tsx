'use client'

import { navigate } from '@/lib/actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const makeNewPolygon = () => {
  let name = window.prompt("Enter a name for the new polygon");
  if(name) {
    fetch('/api/polygons', {
      method : "POST",
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        name : name
      })
    }).then(resp => resp.json()).then(results => {
      console.log(results)
      if(results.error) {
        toast(results.error)
      } else {
        navigate(`/research/${results.id}`);
      }
    });
  }
}

export default function CreatePolygon() {
  return (
    <>
      <button type="button" onClick={() => makeNewPolygon()} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
        Create New Polygon
      </button>
      <ToastContainer />
    </>
  )
}
