import {closeModalOnClick} from './util.js';
import {initialStateForm} from './util.js';

const adForm = document.querySelector('.ad-form');
const clearButton = adForm.querySelector('.ad-form__reset');
const mapFilter = document.querySelector('.map__filters');
const DISABLED_ELEMENTS = [adForm, mapFilter];
const adresForm = adForm.querySelector('#address');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const main = document.querySelector('main');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const typeAd = adForm.querySelector('#type');
const priceAd = adForm.querySelector('#price');

const minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
}

const timeInTimeOut = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00',
}

//Функция устанавливающаю поле "цена" в зависимость от поля "тип жилья"
const setDependValueAndMinAtr = (firstInput, secondInput, map) => {
  firstInput.addEventListener('change', (evt) => {
    secondInput.min = map[evt.target.value];
    secondInput.placeholder = map[evt.target.value];
  });
};

//Функция настройки зависимости значения одного поля ввода от значения другого поля ввода
const setDependValue = (firstInput, secondInput, map) => {
  firstInput.addEventListener('change', (evt) => {
    secondInput.value = map[evt.target.value];
  });
};

const setForm = () => {
  setDependValue(timeIn, timeOut, timeInTimeOut);
  setDependValue(timeOut, timeIn, timeInTimeOut);
  setDependValueAndMinAtr(typeAd, priceAd, minPrice);
};

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
  showSuccessMessage();
};

export {adForm, clearButton, DISABLED_ELEMENTS, adDisabled, adresForm, onSuccessSendData, initialStateForm, showErrorMessage, setForm};
