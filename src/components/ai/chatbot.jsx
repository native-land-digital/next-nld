'use client'
import Chatbot from "react-chatbot-kit";
import { useState, useEffect } from 'react';
import 'react-chatbot-kit/build/main.css'

import config from '@/components/ai/chatbot/config.js';
import MessageParser from '@/components/ai/chatbot/MessageParser.js';
import ActionProvider from '@/components/ai/chatbot/ActionProvider.jsx';
import '@/components/ai/chatbot/chatbot.css'

export default function AIChatbot() {

  return (
    <div className="fixed right-0 bottom-0 z-50 m-5 w-1/2">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  )
}
