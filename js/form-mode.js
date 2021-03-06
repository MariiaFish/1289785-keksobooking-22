import {closeModalOnClick, initialStateForm} from './util.js';
import {adForm} from './setting-form.js';
import {sendDataToServer} from './api-data.js';
import {backMarkerToOriginal, mainPinMarker} from './markers.js'
// import {map} from './map-active-set.js'

const mapFilter = document.querySelector('.map__filters');
const DISABLED_ELEMENTS = [adForm, mapFilter];
const adresForm = adForm.querySelector('#address');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const main = document.querySelector('main');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const mapFilters = document.querySelector('.map__filters');

// Функция неактивного режима формы
const adDisabled = (disabledElements) => {
  disabledElements.forEach((arrElement) => {
    arrElement.classList.add('ad-form--disabled');
    const formElements = arrElement.querySelectorAll('fieldset, select')
    formElements.forEach((element) => {
      element.disabled = true;
    });
  });
};

// Закрытие окна по нажатию на клавишу ESC
const closeModalOnEsc = (closedElement) => {
  window.addEventListener('keydown', (evt) => {
    if (evt.key == 'Escape') {
      closedElement.classList.add('hidden');
    }
  });
};

// Сообщение об ошибке при отправке формы
const showErrorMessage = () => {
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  main.appendChild(newErrorMessage);
  closeModalOnEsc(newErrorMessage);
  const errorButton = newErrorMessage.querySelector('.error__button');
  closeModalOnClick(errorButton, newErrorMessage);
  closeModalOnClick(window, newErrorMessage);
};

// Сообщение об успешной отправке формы
const showSuccessMessage = () => {
  const newSuccessMessage = successMessageTemplate.cloneNode(true);
  main.appendChild(newSuccessMessage);
  closeModalOnClick(window, newSuccessMessage);
  closeModalOnEsc(newSuccessMessage);
};

// Функция для обработки формы и вывода сообщения об успешной отправке
const onSuccessSendData = () => {
  initialStateForm(adForm);
  initialStateForm(mapFilters);
  backMarkerToOriginal(mainPinMarker);
  showSuccessMessage();
};

// Функция для добавления обработчика отправки формы на кнопку
const setAdSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendDataToServer(
      () => onSuccess(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

// Функция для добавления обработчика отчиски формы на кнопку
const setClearAdForm = (button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    initialStateForm(adForm);
    initialStateForm(mapFilters);
    backMarkerToOriginal(mainPinMarker);
  });
};

export {adForm, DISABLED_ELEMENTS, adDisabled, adresForm, onSuccessSendData, initialStateForm, showErrorMessage, setAdSubmit, setClearAdForm};
