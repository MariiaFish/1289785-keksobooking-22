// import {getMapType, createMap} from './map-class.js';

const IMG_HEIGHT = 40;
const IMG_WIDTH = 45;
const IMG_ALT = 'Фотография жилья';
const TRIGGER_VALUE_FIRST = 1;
const TRIGGER_VALUE_SECOND = 4;
const MIN_DECIMAL_VALUE = 10;
const MAX_DECIMAL_VALUE = 20;
const MAP_FLAT_TYPE = {flat: 'Квартира', bungalow: 'Бунгало', house: 'Дом', palace: 'Дворец'};
const similarAddTemplate = document.querySelector('#card').content.querySelector('.popup');
const addsFragment = document.createDocumentFragment();

// Функция для получения занчения мар
const getMapType = (map, key) => {
  return map[key];
};

// Функция для строки заезд + выезд
const printCheckinCheckout = (checkin, checkout) => {
  let result = `Заезд после ${checkin}, выезд до ${checkout}`
  if (checkin === undefined || checkout === undefined) {
    return result = undefined;
  }
  return result;
};

// Функция для возвращения остатка
const valueReminder = (value, decimalValue) => {
  const reminder = value % decimalValue;
  return reminder;
};

// Функция для выведения строки гости + комнаты
const printRoomsGuests = (rooms, guests) => {
  const reminderRooms = valueReminder(rooms, MIN_DECIMAL_VALUE);
  const reminderGuests = valueReminder(guests, MIN_DECIMAL_VALUE);
  let printRooms = 'комната для';
  let printGuests = 'гостя';
  if (rooms > TRIGGER_VALUE_FIRST && rooms <= TRIGGER_VALUE_SECOND) {
    printRooms = 'комнаты для';
  } else if (rooms > TRIGGER_VALUE_SECOND) {
    printRooms = 'комнат для';
  }
  if (rooms > MAX_DECIMAL_VALUE) {
    printRooms = 'комната для';
    if (reminderRooms > TRIGGER_VALUE_FIRST && reminderRooms <= TRIGGER_VALUE_SECOND) {
      printRooms = 'комнаты для';
    } else if (reminderRooms > TRIGGER_VALUE_SECOND) {
      printRooms = 'комнат для';
    }
  }
  if (guests > TRIGGER_VALUE_FIRST) {
    printGuests = 'гостей';
  }
  if (guests > MAX_DECIMAL_VALUE){
    printGuests = 'гостей';
    if (reminderGuests === TRIGGER_VALUE_FIRST) {
      printGuests = 'гостя';
    }
  }
  if (rooms === undefined || guests === undefined) {
    return result = undefined;
  }
  let result = `${rooms} ${printRooms} ${guests} ${printGuests}`;
  return result;
};

// Функция для отчиски коллекции
const clearHTMLCollection = (element) => {
  const collection = element.children;
  for (let i = collection.length-1; i >= 0; i--) {
    const child = collection[i];
    child.parentElement.removeChild(child);
  }
};

// Функция для создания элементов в блоке Photos
const createPhotos = (docElement, photos) => {
  clearHTMLCollection(docElement);
  photos.forEach((element) => {
    const newImgElement = document.createElement('img');
    newImgElement.classList.add('popup__photo');
    newImgElement.src = element;
    newImgElement.width = IMG_WIDTH;
    newImgElement.height = IMG_HEIGHT;
    newImgElement.alt = IMG_ALT;
    docElement.appendChild(newImgElement);
  });
  return docElement;
};

// Функция для создания списка элементов в блоке Feature
const createFeatures = (docElement, features) => {
  clearHTMLCollection(docElement);
  features.forEach((element) => {
    const newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add(`popup__feature--${element}`);
    docElement.appendChild(newElement);
  });
  return docElement;
};

// Функция для заполнения эдемента с дочерними элементами
const fillComplexElement = (environment, classElement, fn, keyValue) => {
  const popupElement = environment.querySelector(classElement);
  if (keyValue === undefined) {
    popupElement.hidden = true;
  }
  return fn(popupElement, keyValue);
};

const fillElement = (templateElement, classElement, keyValue) => {
  templateElement.querySelector(classElement).textContent = keyValue;

  if (classElement === '.popup__avatar') {
    templateElement.querySelector(classElement).src = keyValue;
  }

  if (keyValue === undefined) {
    templateElement.querySelector(classElement).hidden = true;
  }
};

const createTemplateElement = (objectElement) => {
  const {offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, author: {avatar}} = objectElement;
  const newAdElement = similarAddTemplate.cloneNode(true);
  fillElement(newAdElement, '.popup__title', title);
  fillElement(newAdElement, '.popup__text--address', address);
  fillElement(newAdElement, '.popup__text--price', `${price} ₽/ночь`);
  fillElement(newAdElement, '.popup__type', getMapType(MAP_FLAT_TYPE, type));
  fillElement(newAdElement, '.popup__text--capacity', printRoomsGuests(rooms, guests));
  fillElement(newAdElement, '.popup__text--time', printCheckinCheckout(checkin, checkout));
  fillComplexElement(newAdElement, '.popup__features', createFeatures, features);
  fillElement(newAdElement, '.popup__description', description);
  fillComplexElement(newAdElement, '.popup__photos', createPhotos, photos);
  fillElement(newAdElement, '.popup__avatar', avatar);
  addsFragment.appendChild(newAdElement);
  return newAdElement;
};

export {createTemplateElement};
// todo: функция printCheckinCheckout громоздкая, думаю доработать её через switch
