/* global L:readonly */
/* global _:readonly */
import  {activeStateForm} from './active-state-form.js';
import {DISABLED_ELEMENTS, adresForm} from './form-mode.js';
import {tileLayer, addToMap} from './map-layer.js';
import {createGroupMarks, getMarkerAdres, mainPinMarker, removeMarker, pinGroupToMap} from './markers.js';
import {getServerData} from './api-data.js';
import {getFilteredData, getFiltersValues} from './filter-of-ads.js';

const MAP_ADDITIONS = [tileLayer, mainPinMarker];
const DECIMAL_PLACES = 5;
const MAX_MARKERS_VALUE = 10;
const DEBOUNCE_TIME = 500;
const filters = document.querySelector('.map__filters');

const createMap = () => {
  const newMap = L.map('map-canvas')
    .on('load', () => {
      activeStateForm(DISABLED_ELEMENTS, adresForm);
    })
    .setView({
      lat: 35.68950,
      lng: 139.69171,
    }, 10);
  return newMap;
};

const renderMapInActiveState = () => {
  const map = createMap();
  addToMap(MAP_ADDITIONS, map);
  getMarkerAdres(mainPinMarker, adresForm, DECIMAL_PLACES);
  getServerData((ads) => {
    let newGroupOfMarkers = createGroupMarks(ads.slice(0, MAX_MARKERS_VALUE));
    pinGroupToMap(newGroupOfMarkers, map);
    const filtersValues = {
      'housing-type': 'any',
      'housing-price': 'any',
      'housing-rooms': 'any',
      'housing-guests': 'any',
    }

    const debounceChangedMarkers = _.debounce((evt) => {
      removeMarker(map, newGroupOfMarkers);
      let newFiltersValues = getFiltersValues(evt, filtersValues);
      newGroupOfMarkers = createGroupMarks(getFilteredData(ads, newFiltersValues));
      pinGroupToMap(newGroupOfMarkers, map);
    }
    , DEBOUNCE_TIME);


    const debounceReset = _.debounce(() => {
      removeMarker(map, newGroupOfMarkers);
      newGroupOfMarkers = createGroupMarks(getFilteredData(ads, filtersValues));
      pinGroupToMap(newGroupOfMarkers, map);
    },
    DEBOUNCE_TIME);

    filters.addEventListener('change', (evt) => {
      debounceChangedMarkers(evt);
    });

    filters.addEventListener('reset', () => {
      debounceReset();
    });

  });
};

export {renderMapInActiveState};
