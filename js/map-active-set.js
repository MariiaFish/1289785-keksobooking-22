/* global L:readonly */
import  {activeStateForm} from './active-state-form.js';
import {DISABLED_ELEMENTS, adresForm} from './form-mode.js';
import {tileLayer, addToMap} from './map-layer.js';
import {createGroupMarks, getMarkerAdres, mainPinMarker, removeMarker, pinGroupToMap} from './markers.js';
import {getServerData} from './api-data.js';
import {getFilteredData, getFiltersValues} from './filter-of-ads.js';

const MAP_ADDITIONS = [tileLayer, mainPinMarker];
const DECIMAL_PLACES = 5;
const MAX_MARKERS_VALUE = 10;
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
    let filtersValues = {
      'housing-type': 'any',
      'housing-price': 'any',
      'housing-rooms': 'any',
      'housing-guests': 'any',
    }

    filters.addEventListener('change', (evt) => {
      removeMarker(map, newGroupOfMarkers);
      filtersValues = getFiltersValues(evt, filtersValues);
      newGroupOfMarkers = createGroupMarks(getFilteredData(ads, filtersValues));
      pinGroupToMap(newGroupOfMarkers, map);
    });

    filters.addEventListener('reset', () => {
      removeMarker(map, newGroupOfMarkers);
      filtersValues = {
        'housing-type': 'any',
        'housing-price': 'any',
        'housing-rooms': 'any',
        'housing-guests': 'any',
      }
      newGroupOfMarkers = createGroupMarks(getFilteredData(ads, filtersValues));
      pinGroupToMap(newGroupOfMarkers, map);
    });

  });
};

export {renderMapInActiveState};
