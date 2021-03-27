const adForm = document.querySelector('.ad-form');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const typeAd = adForm.querySelector('#type');
const priceAd = adForm.querySelector('#price');
const titleAd = adForm.querySelector('#title');
const roomsNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

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

// Функция для добавления атрибута required
const addRequiredAtr = (formElement) => {
  formElement.required = true;
};
// Функция для добавления атрибута min
const addMinLength = (formElement, length) => {
  formElement.minLength = length;
};

const addMaxLength = (formElement, length) => {
  formElement.maxLength = length;
};

const addMax = (formElement, max) => {
  formElement.max = max;
};

const setDependsCapacityAndRooms = () => {

  if(roomsNumber.value == 1) {
    capacity.options[2].selected = true;
    capacity.options[0].hidden = true;
    capacity.options[1].hidden = true;
    capacity.options[3].hidden = true;
  }
  roomsNumber.addEventListener('change', (evt) => {
    if(evt.target.value == 1) {
      capacity.options[2].selected = true;
      capacity.options[0].hidden = true;
      capacity.options[1].hidden = true;
      capacity.options[3].hidden = true;
    }
    if (evt.target.value == 2) {
      capacity.options[1].selected = true;
      capacity.options[1].hidden = false;
      capacity.options[2].hidden = false;
      capacity.options[0].hidden = true;
      capacity.options[3].hidden = true;

    }
    if (evt.target.value == 3) {
      capacity.options[0].selected = true;
      capacity.options[0].hidden = false;
      capacity.options[1].hidden = false;
      capacity.options[2].hidden = false;
      capacity.options[3].hidden = true;
    }
    if (evt.target.value == 100) {
      capacity.options[3].selected = true;
      capacity.options[0].hidden = true;
      capacity.options[1].hidden = true;
      capacity.options[2].hidden = true;
      capacity.options[3].hidden = false;
    }
  });
};

const setValidationOfTitle = () => {
  addRequiredAtr(titleAd);
  addMinLength(titleAd, MIN_TITLE_LENGTH);
  addMaxLength(titleAd, MAX_TITLE_LENGTH);
};

//Функция настройки зависимости значения одного поля ввода от значения другого поля ввода
const setDependValue = (firstInput, secondInput, map) => {
  firstInput.addEventListener('change', (evt) => {
    secondInput.value = map[evt.target.value];
  });
};

const setValidationOfPrice = () => {
  addRequiredAtr(priceAd);
  addMax(priceAd, MAX_PRICE);
};

//Функция устанавливающаю поле "цена" в зависимость от поля "тип жилья"
const setDependValueAndMinAtr = (firstInput, secondInput, map) => {
  firstInput.addEventListener('change', (evt) => {
    secondInput.min = map[evt.target.value];
    secondInput.placeholder = map[evt.target.value];
  });
};

const settingsForm = () => {
  setDependValue(timeIn, timeOut, timeInTimeOut);
  setDependValue(timeOut, timeIn, timeInTimeOut);
  setDependValueAndMinAtr(typeAd, priceAd, minPrice);
  setValidationOfTitle();
  setValidationOfPrice();
  setDependsCapacityAndRooms();
  setDependsCapacityAndRooms();
};

export {settingsForm, adForm};
