/* global L:readonly */
import {createTemplateElement} from './template-ad-element.js';

const MAINMARKERCOORDIATES = {
  lat: 35.68950,
  lng: 139.69171,
}

const primeMarker = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30],
  iconAnhor: [15, 30],
});

const mainMarker = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [40, 40],
  iconAnhor: [20, 36],
});

const mainPinMarker = L.marker(
  {
    lat: MAINMARKERCOORDIATES.lat,
    lng: MAINMARKERCOORDIATES.lng,
  },
  {
    draggable: true,
    icon: mainMarker,
  },
);

// Функция для возвращения главной метки на исходное место
const backMarkerToOriginal = (marker) => {
  marker.setLatLng({
    lat: MAINMARKERCOORDIATES.lat,
    lng: MAINMARKERCOORDIATES.lng,
  });
};

//Функция для передачи адреса метки в поле ввода
const getMarkerAdres = (marker, element, decimalPlaces) => {
  marker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    element.value = `${coordinates.lat.toFixed(decimalPlaces)} ${coordinates.lng.toFixed(decimalPlaces)}`;
  });
};

// Функция для добавления меток из массива на карту
const createGroupMarks = (ads) => {
  const adsGroup = L.layerGroup();
  ads.forEach((ad) => {
    const {location: {lat, lng}} = ad;
    const marker = L.marker({
      lat: lat,
      lng: lng,
    },
    {
      icon: primeMarker,
    },
    );
    marker.addTo(adsGroup)
      .bindPopup(createTemplateElement(ad));
  });
  return adsGroup;
};

const pinGroupToMap = (group, map) => {
  group.addTo(map);
}

const removeMarker = (map, group) => {
  group.remove(map);
}
export {mainPinMarker, createGroupMarks, getMarkerAdres, removeMarker, pinGroupToMap, backMarkerToOriginal};
