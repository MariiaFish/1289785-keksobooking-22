/* global L:readonly */
import  {activeStateForm} from './active-state-form.js';
import {DISABLED_ELEMENTS, adForm} from './inactive-state.js';
import {SIMILAR_ADS_COUNT, createAd} from './ad-object.js';
import {tileLayer} from './map-layer.js';

const adresForm = adForm.querySelector('#address');
const MAP_ADDITIONS = [tileLayer, mainPinMarker];
import {pinAllMarks, getMarkerAdres, mainPinMarker} from './markers.js';
const adsArr = new Array(SIMILAR_ADS_COUNT).fill(null).map(() => createAd());

// Функция добавления объектов к карте
const addToMap = (arrAdditions, map) => {
  arrAdditions.forEach((element) => {
    element.addTo(map);
  });
};

const renderMapInActiveState = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      activeStateForm(DISABLED_ELEMENTS, adresForm);
    })
    .setView({
      lat: 35.68950,
      lng: 139.69171,
    }, 10);
  addToMap(MAP_ADDITIONS, map);
  getMarkerAdres(mainPinMarker, adresForm);
  pinAllMarks(adsArr, map);
};

export {renderMapInActiveState};
