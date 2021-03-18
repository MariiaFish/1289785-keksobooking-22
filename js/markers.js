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
const getMarkerAdres = (marker, element, decimalPlaces) => {
  marker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    element.value = `${coordinates.lat.toFixed(decimalPlaces)} ${coordinates.lng.toFixed(decimalPlaces)}`;
  });
};

// Функция для добавления меток из массива на карту
const pinAllMarks = (ads, map) => {
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
    marker.addTo(map)
      .bindPopup(createTemplateElement(ad));
  });
};

// pinAllMarks принимает параметр ads - массив с объявлениями,

export {mainPinMarker, pinAllMarks, getMarkerAdres};
