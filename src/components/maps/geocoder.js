import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';

// Our own entry results (externalGeocoder) start at 3 characters, but the paid
// place geocoder only gets called at 4+ to keep request volume down
const ENTRY_MIN_LENGTH = 3;
const PLACE_MIN_LENGTH = 4;

const emptyResults = { type : "FeatureCollection", features : [] };

// Provider adapter -- swap this object out to change geocoding providers.
// forwardGeocode must resolve to a FeatureCollection of Carmen-style features
// (place_name, center, and optionally bbox)
export const mapboxGeocoderApi = {
  forwardGeocode : async (config) => {
    if(!config.query || config.query.length < PLACE_MIN_LENGTH) {
      return emptyResults;
    }
    const params = new URLSearchParams({
      access_token : process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
      autocomplete : true,
      limit : config.limit || 5,
      language : config.language ? config.language.join(',') : navigator.language,
    });
    if(config.proximity) {
      params.set('proximity', config.proximity.join(','));
    }
    if(config.bbox) {
      params.set('bbox', config.bbox.join(','));
    }
    if(config.countries) {
      params.set('country', config.countries.join(','));
    }
    if(config.types) {
      params.set('types', config.types.join(','));
    }
    try {
      const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(config.query)}.json?${params}`);
      if(!resp.ok) {
        return emptyResults;
      }
      return await resp.json();
    } catch (err) {
      console.error(err);
      return emptyResults;
    }
  }
};

export const createGeocoder = (options = {}) => {
  return new MaplibreGeocoder(mapboxGeocoderApi, {
    showResultsWhileTyping : true,
    showResultMarkers : false,
    marker : !!options.maplibregl,
    debounceSearch : 400,
    minLength : options.externalGeocoder ? ENTRY_MIN_LENGTH : PLACE_MIN_LENGTH,
    getItemValue : (item) => item.place_name,
    ...options
  });
}
