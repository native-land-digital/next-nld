import { createChatBotMessage, createCustomMessage } from 'react-chatbot-kit';
import Markdown from 'react-markdown'

/*
Welcome message could encourage a few things: asking its name, asking about its training, asking about land acknowledgements, its purpose, about Native Land Digital

*/
function BotChatMessage({ message }) {
  return <div className="rounded-md bg-blue-300 py-2.5 px-3 text-sm ml-2.5">
    {!message || message === "" ? "Thinking..." : <Markdown>{message}</Markdown>}
  </div>
}

const config = (setMinimized) => {
  return {
    initialMessages: [
      createChatBotMessage(`Welcome! My name is Kōrero. Please experiment by changing the prompt above before you start chatting with me.`),
      createCustomMessage('Test', 'custom')
    ],
    botName : "Kōrero",
    customComponents : {
      botChatMessage: BotChatMessage,
      header: () => {
        return (
          <div className="bg-slate-400 p-2.5 text-sm rounded-tl-md rounded-tr-md">
            Conversation with Kōrero
            <button className="float-right bg-slate-200 rounded-lg shadow-lg p-1 -mt-1" onClick={() => setMinimized(true)}>
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
              </svg>
            </button>
          </div>
        )
      },
      botAvatar : () => {
        return (
          <div className="rounded-full mt-2.5 h-5 w-5 min-w-5">
            <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 473.02 511.76"><path fillRule="nonzero" d="M295.19 225.4c1.01 7.88-4.72 15.18-12.81 16.31-8.09 1.14-15.47-4.33-16.48-12.2-1.27-9.88-6.46-16.13-13.11-19.07-8.62-3.79-19.45-2.6-27.69 1.57-9.28 4.71-16.69 13.82-17.75 26.85-.88 10.83 1.84 21.41 7.4 30.69 6.17 10.3 15.26 18.4 25.68 24.23 16.3 9.11 33.06 11.66 48.47 9.3 17.05-2.61 32.66-11.18 44.4-23.52 8.94-9.41 15.63-20.99 18.97-33.77 3.12-11.89 3.36-24.9-.13-38.25l-.52-1.96c-8.71-31.27-28.89-56.11-54.67-71.05-57.13-33.14-129.12-12.08-161.65 44.79-39.53 69.14-1.35 154.36 63.54 192.02 35.35 20.5 78.39 27.53 121 16.39l2.69-.71c87.46-24.46 138.37-115.77 115.51-203.23l-.87-3.22c-15.18-54.65-50.46-98.05-95.53-124.19l-.05.02c-70.99-41.2-158.8-35.41-224.17 12.33-20.51 14.98-38.03 33.56-51.87 54.58-53.67 81.53-45.28 179.1 11.52 255.61 18.06 24.34 40.61 45.75 66.41 62.73 56.02 36.89 127.34 52.71 201.28 32.27 7.87-2.21 15.97 2.2 18.09 9.83 2.12 7.64-2.54 15.63-10.41 17.84-83.12 22.99-163.13 5.3-225.85-36-28.5-18.76-53.47-42.48-73.52-69.5-63.99-86.22-72.58-196.42-12.24-288.07 15.73-23.88 35.73-45.06 59.25-62.23C175.01-8.92 275.64-15.75 357.05 31.5c51.24 29.79 91.35 79.02 108.58 140.92l1.01 3.69c26.89 102.9-33.66 209.84-136.33 238.55l-3.24.9c-50.64 13.24-101.71 4.92-143.58-19.37-78.63-45.62-121.35-147.6-73.94-230.51 40.72-71.2 131.29-97.47 202.76-56.01 31.99 18.56 57 49.23 67.78 87.76l.66 2.43c4.77 18.27 4.41 36.16.11 52.6-4.63 17.67-13.83 33.63-26.12 46.55-16.22 17.05-37.9 28.91-61.68 32.55-21.79 3.34-45.21-.13-67.67-12.67-14.63-8.18-27.61-20.05-36.26-34.48-8.66-14.45-12.56-30.51-11.18-47.32 1.98-24.36 16.16-41.55 33.97-50.57 16.39-8.32 36.42-9.88 53.42-2.37 15.33 6.77 27.17 20.36 29.85 41.25z"/></svg>
          </div>
        )
      }
    }
  };
}

export default config;
