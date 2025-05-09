'use client'
import { useState } from 'react';
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'

import config from '@/components/ai/chatbot/config.js';
import MessageParser from '@/components/ai/chatbot/MessageParser.js';
import ActionProvider from '@/components/ai/chatbot/ActionProvider.jsx';
import '@/components/ai/chatbot/chatbot.css'

export default function AIChatbot() {

  const [minimized, setMinimized] = useState(true);
  const [closed, setClosed] = useState(false);

  if(closed) {
    return false;
  }

  return (
    <>
      <div className={`fixed right-0 bottom-0 m-5 ${minimized ? 'w-0 h-0 -z-10' : 'z-50 w-6/7 md:w-1/2'}`}>
        <Chatbot
          config={config(setMinimized)}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
      {minimized ?
        <div className="fixed left-0 bottom-0 m-2.5 mb-2.5 md:mb-8 ml-4 md:ml-2.5 z-50">
          <div className="rounded-md bg-blue-900 hover:bg-blue-600 cursor-pointer shadow-lg">
            <div className="hidden md:inline-flex py-2.5 pl-2.5 text-white text-sm" onClick={() => setMinimized(false)}>
              Click here to speak with Kōrero, our AI Territory Acknowledgement helper!
            </div>
            <div className="inline-flex md:hidden py-2.5 pl-2.5 inline-flex text-xs" onClick={() => setMinimized(false)}>
              Chat with Kōrero for help with acknowledgements!
            </div>
            <button onClick={() => setClosed(!closed)} type="button" className="mx-2.5 mt-2.5 size-5 float-right justify-center items-center gap-x-2 rounded-full bg-slate-100 text-black hover:bg-slate-200" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="shrink-0 size-4 pl-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      : false}
    </>
  )
}
