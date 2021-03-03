/* global L:readonly */
import {createTemplateElement} from './template-ad-element.js';

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
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainMarker,
  },
);

//Функция для передачи адреса метки в поле ввода
const getMarkerAdres = (marker, element) => {
  marker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    element.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
  });
};

// Функция для добавления меток из массива на карту
const pinAllMarks = (arr, map) => {
  arr.forEach((ad) => {
    const {location: {x, y}} = ad;
    const marker = L.marker({
      lat: x,
      lng: y,
    },
    {
      icon: primeMarker,
    },
    );
    marker.addTo(map)
      .bindPopup(createTemplateElement(ad));
  });
};


export {mainPinMarker, pinAllMarks, getMarkerAdres};
