'use client'

export default function AudioPlayer({ greeting }) {

  return (
    <svg onClick={() => { new Audio(greeting.url).play() }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="inline ml-2.5 bi bi-play-circle cursor-pointer" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
    </svg>
  );
}
