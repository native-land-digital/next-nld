'use client'
import Chatbot from "react-chatbot-kit";
import { useState, useEffect } from 'react';
import 'react-chatbot-kit/build/main.css'

import config from '@/components/ai/experimental/chatbot/config.js';
import MessageParser from '@/components/ai/experimental/chatbot/MessageParser.js';
import ActionProvider from '@/components/ai/experimental/chatbot/ActionProvider.jsx';
import '@/components/ai/experimental/chatbot/chatbot.css'

export default function AIChatbot() {

  const [minimized, setMinimized] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('You are a Maori ancestor. Please answer questions with respect and care.')

  useEffect(() => {
    if(systemPrompt) {
      window.systemPrompt = systemPrompt;
    }
  }, [systemPrompt])

  return (
    <>
      <div className="w-2/3 mt-5">
        On this page, you can experiment with creating a AI using a unique prompt. If you have a good conversation, note the prompt down separately and let us know!
      </div>
      <h2 className="text-lg font-bold mt-5">Enter starting prompt below. If you want to change the prompt, please refresh the page.</h2>
      <div className="w-2/3 mt-5">
        <textarea className="p-2.5 border border-black w-full h-[200px]" onChange={(e) => setSystemPrompt(e.target.value)} value={systemPrompt} />
      </div>
      <div className={`fixed right-0 bottom-0 z-50 m-5 w-1/2 ${minimized ? 'w-0 h-0 -z-10' : ''}`}>
        <Chatbot
          config={config(setMinimized)}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
      {minimized ?
        <div className="fixed right-0 bottom-0 m-5 z-50">
          <div className="rounded-full bg-blue-500 p-5 hover:bg-blue-600 border border-white cursor-pointer shadow-lg" onClick={() => setMinimized(false)}>
            Click here to speak with Kōrero.
          </div>
        </div>
      : false}
    </>
  )
}
