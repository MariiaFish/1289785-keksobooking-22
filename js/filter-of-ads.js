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

// Проверка на значение 'any' для type
const isAnyType = (filterValue, objectValue) => {
  if (objectValue === 'any') {
    return true;
  }
  return filterValue === objectValue;
};

// Проверка на значение 'any'
const isAny = (filterValue, objectValue) => {
  if (objectValue === 'any') {
    return true;
  }
  return filterValue === Number(objectValue);
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
const getFilteredData = (ads, filterValues) => {
  let filteredAds = ads.filter((ad) => {
    const {offer: {type, price, rooms, guests, features}} = ad;
    return isAnyType(type, filterValues['housing-type'])
    && isAny(rooms, filterValues['housing-rooms'])
    && isAny(guests, filterValues['housing-guests'])
    && priceFilter(price, filterValues['housing-price'])
    && filteredFeature(features, filterValues['filter-wifi'])
    && filteredFeature(features, filterValues['filter-dishwasher'])
    && filteredFeature(features, filterValues['filter-parking'])
    && filteredFeature(features, filterValues['filter-washer'])
    && filteredFeature(features, filterValues['filter-elevator'])
    && filteredFeature(features, filterValues['filter-conditioner']);
  });
  return filteredAds;
};

export{getFiltersValues, getFilteredData}
