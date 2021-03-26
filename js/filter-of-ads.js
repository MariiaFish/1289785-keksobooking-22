// import {getServerData} from './api-data.js';
import {findElementFromArray} from './util.js'


// Функция которая возвращает объект-актуальных значений фильтров
const getFiltersValues = (evt, startMap) => {
  const map = Object.assign({}, startMap);
  if (evt.target.name !== 'features') {
    map[evt.target.name] = evt.target.value;
  }
  if (evt.target.checked && evt.target.name === 'features') {
    map[evt.target.id] = evt.target.value;
  }
  if (!evt.target.checked && evt.target.name === 'features') {
    delete map[evt.target.id];
  }
  return map;
};

// Проверка на значение 'any'
const isAny = (filterValue, objectValue) => {
  if (objectValue === 'any') {
    return true;
  }
  return filterValue == objectValue;
};

// Фильр для фильтрации заначения ключа price
const priceFilter = (objectValuePrice, filterValue) => {
  if (isAny(objectValuePrice, filterValue)) {
    return true;
  }
  if (filterValue === 'middle') {
    return objectValuePrice > 10000 && objectValuePrice <= 50000;
  }
  if (filterValue === 'low') {
    return objectValuePrice <= 10000;
  }
  if (filterValue === 'high') {
    return objectValuePrice > 50000;
  }
};

// Функция для фильтрации features
const filteredFeature = (adValue, element) => {
  if (findElementFromArray(adValue, element) === element){
    return true;
  }
};


// Функция которая фильтрует массив данных с сервера
const getFilteredData = (ads, filterValue) => {
  let filteredAds = ads.filter((ad) => {
    const {offer: {type, price, rooms, guests, features}} = ad;
    return isAny(type, filterValue['housing-type'])
    && isAny(rooms, filterValue['housing-rooms'])
    && isAny(guests, filterValue['housing-guests'])
    && priceFilter(price, filterValue['housing-price'])
    && filteredFeature(features, filterValue['filter-wifi'])
    && filteredFeature(features, filterValue['filter-dishwasher'])
    && filteredFeature(features, filterValue['filter-parking'])
    && filteredFeature(features, filterValue['filter-washer'])
    && filteredFeature(features, filterValue['filter-elevator'])
    && filteredFeature(features, filterValue['filter-conditioner']);
  });
  return filteredAds;
};

// const setFiltersAds = () => {
// getServerData((ads) => {
//   let filtersValues = {
//     'housing-type': 'any',
//     'housing-price': 'any',
//     'housing-rooms': 'any',
//     'housing-guests': 'any',
//   }

//   filters.addEventListener('change', (evt) => {
//     filtersValues = getFiltersValues(evt, filtersValues);
//     getFilteredData(ads, filtersValues);
//   });
// });
// };

export{getFiltersValues, getFilteredData}
