'use client';

import { useRef, useState, useEffect } from 'react';
import { ReactFlipBook } from '@vuvandinh203/react-flipbook';

const PAGE_ASPECT = 1100 / 850;
const MOBILE_BREAKPOINT = 768;
// const TOTAL_PAGES = 6;

const pages = [
  'https://next-nld-uploads.s3.us-west-2.amazonaws.com/zine/1/page-01.jpg',
  ...Array.from({ length: 3 }, (_, i) => {
    const num = String(i + 2).padStart(2, '0');
    return [`https://next-nld-uploads.s3.us-west-2.amazonaws.com/zine/1/split-${num}-L.jpg`, `https://next-nld-uploads.s3.us-west-2.amazonaws.com/zine/1/split-${num}-R.jpg`];
  }).flat(),
];

export default function Zine() {
  const containerRef = useRef(null);
  const bookRef = useRef(null);
  const [dims, setDims] = useState(null);
  // const inputRef = useRef(null);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const pageWidth = isMobile ? containerWidth : Math.floor(containerWidth / 2);
    const pageHeight = Math.floor(pageWidth * PAGE_ASPECT);
    setDims({ pageWidth, pageHeight, isMobile });
  }, []);

  // function handlePageChange(page) {
  //   setCurrentPage(page + 1);
  // }

  // function handleGo() {
  //   const parsed = parseInt(inputRef.current?.value, 10);
  //   if (!isNaN(parsed) && parsed >= 1 && parsed <= TOTAL_PAGES) {
  //     bookRef.current?.flip(parsed - 1);
  //     inputRef.current.value = '';
  //   }
  // }

  return (
    <div className="flex flex-col items-center mt-4 py-4">
      <div ref={containerRef} className="w-full">
        {dims && (
          <ReactFlipBook
            ref={bookRef}
            width={dims.pageWidth}
            height={dims.pageHeight}
            usePortrait={dims.isMobile}
            showCover={true}
            showNavigationButtons={true}
            enableKeyboardNav={true}
            mobileScrollSupport={true}
            flippingTime={700}
            drawShadow={true}
            maxShadowOpacity={0.4}
          >
            {pages.map((src, i) => (
              <div key={i} style={{ width: '100%', height: '100%' }}>
                <img
                  src={src}
                  alt={`Page ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </ReactFlipBook>
        )}
      </div>

      {/* <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
        <span>Page {currentPage} of {TOTAL_PAGES}</span>
        <span>—</span>
        <span>Go to:</span>
        <input
          ref={inputRef}
          type="number"
          min={1}
          max={TOTAL_PAGES}
          placeholder="..."
          className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-sm"
        />
        <button
          onClick={handleGo}
          className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100"
        >
          Go
        </button>
      </div>*/}
    </div>
  );
}
