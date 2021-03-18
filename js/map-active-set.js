/* global L:readonly */
import  {activeStateForm} from './active-state-form.js';
import {DISABLED_ELEMENTS, adresForm} from './form-mode.js';
// import {SIMILAR_ADS_COUNT, createAd} from './ad-object.js';
import {tileLayer} from './map-layer.js';
import {pinAllMarks, getMarkerAdres, mainPinMarker} from './markers.js';
import {getServerData} from './api-data.js';


const MAP_ADDITIONS = [tileLayer, mainPinMarker];
// const adsArr = new Array(SIMILAR_ADS_COUNT).fill(null).map(() => createAd());
const DECIMAL_PLACES = 5;

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
  getMarkerAdres(mainPinMarker, adresForm, DECIMAL_PLACES);
  getServerData((ads) => {
    pinAllMarks(ads, map);
  });

};

export {renderMapInActiveState};
