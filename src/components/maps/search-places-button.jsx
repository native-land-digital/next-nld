"use client";
import { useState } from 'react';
import { Popover } from 'react-tiny-popover';

const SEARCH_ICON = (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>
  </svg>
);

// Triggers geocoder.searchPlaces() -- the paid Mapbox place lookup -- for
// whatever is currently typed in the geocoder's own input
export default function SearchPlacesButton({ geocoder, label, iconOnly = false }) {
  const [ tooltipOpen, setTooltipOpen ] = useState(false);

  const button = (
    <button
      type="button"
      onMouseEnter={iconOnly ? () => setTooltipOpen(true) : undefined}
      onMouseLeave={iconOnly ? () => setTooltipOpen(false) : undefined}
      onFocus={iconOnly ? () => setTooltipOpen(true) : undefined}
      onBlur={iconOnly ? () => setTooltipOpen(false) : undefined}
      onClick={() => geocoder.searchPlaces()}
      aria-label={label}
      className={iconOnly ? 'nld-geocoder-search-places nld-geocoder-search-places--icon' : 'nld-geocoder-search-places'}
    >
      {iconOnly ? SEARCH_ICON : label}
    </button>
  );

  // The visible text label on the front page already says what the button
  // does -- only the icon-only sidebar version needs a tooltip to explain it
  if(!iconOnly) {
    return button;
  }

  return (
    <Popover
      isOpen={tooltipOpen}
      positions={[ 'top' ]}
      containerStyle={{ zIndex : '9999' }}
      content={
        <div className="mb-1 bg-white/75 px-2.5 py-1 rounded-lg shadow-lg text-black text-sm whitespace-nowrap">
          {label}
        </div>
      }
    >
      {button}
    </Popover>
  );
}
