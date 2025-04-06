'use client'
import { useState } from 'react';
import Chatbot from "react-chatbot-kit";
import { createClientMessage } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css'

import config from '@/components/ai/chatbot/config.js';
import MessageParser from '@/components/ai/chatbot/MessageParser.js';
import ActionProvider from '@/components/ai/chatbot/ActionProvider.jsx';
import '@/components/ai/chatbot/chatbot.css'

export default function AIChatbot() {

  const [minimized, setMinimized] = useState(true);

  return (
    <>
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
            Click here to speak with Kōrero, our AI Territory Acknowledgement helper!
          </div>
        </div>
      : false}
    </>
  )
}
