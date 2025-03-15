'use client'
import { useState, useEffect } from 'react';

export default function TerritoryAI() {

  const [ currentText, setCurrentText ] = useState("");

  const sendMessage = () => {

  }

  return (
    <>
      <div className="mt-2.5 p-2.5 min-h-[30vh] max-h-[70vh] rounded-lg bg-slate-800 text-white">
        <div>
          <p className="text-sm italic text-slate-400">Welcome to the Native Land Territory Acknowledgement AI. Type in a little about what you want to learn, or if you need help with a territory acknowledgement, and our system will help walk you through the process of creating a meaningful land acknowledgement.</p>
        </div>
        <div className="mt-5">
          <textarea placeholder="Type what you are looking for here..." onChange={(e) => setCurrentText(e.target.value)} value={currentText} className="w-full h-32 bg-slate-700 text-gray-800 text-sm border border-slate-800 px-4 py-3 rounded-md outline-blue-600"></textarea>
          <button onClick={() => sendMessage()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">Send Message</button>
        </div>
      </div>
    </>
  )
}
