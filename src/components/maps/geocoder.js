import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';

// Our own entry results (externalGeocoder) start at 3 characters, but the paid
// place geocoder only gets called at 4+ to keep request volume down
const ENTRY_MIN_LENGTH = 3;
const PLACE_MIN_LENGTH = 4;

// Fetches Mapbox place results. Carmen GeoJSON features (place_name, center,
// geometry, and optionally bbox)
const fetchPlaceResults = async (config) => {
  if(!config.query || config.query.length < PLACE_MIN_LENGTH) {
    return [];
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
      return [];
    }
    const data = await resp.json();
    return data.features || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Runs our own site-search results (entryQuery) alongside the Mapbox fetch rather
// than relying on the maplibre-gl-geocoder's own externalGeocoder merge order, so
// that our results are guaranteed to land before the place results regardless of
// library internals
const fetchLocalResults = async (localGeocoder, query) => {
  if(!localGeocoder) {
    return [];
  }
  try {
    return (await localGeocoder(query)) || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createGeocoder = (options = {}) => {
  const { externalGeocoder, ...restOptions } = options;

  const geocoderApi = {
    forwardGeocode : async (config) => {
      const [ localFeatures, placeFeatures ] = await Promise.all([
        fetchLocalResults(externalGeocoder, config.query),
        fetchPlaceResults(config)
      ]);
      // Our own entries first, Mapbox place results after
      return { type : "FeatureCollection", features : [ ...localFeatures, ...placeFeatures ] };
    }
  };

  return new MaplibreGeocoder(geocoderApi, {
    showResultsWhileTyping : true,
    showResultMarkers : false,
    marker : !!options.maplibregl,
    debounceSearch : 400,
    minLength : externalGeocoder ? ENTRY_MIN_LENGTH : PLACE_MIN_LENGTH,
    getItemValue : (item) => item.place_name,
    ...restOptions
  });
}
