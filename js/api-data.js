import {adForm, showErrorMessage} from './form-mode.js';
import {showAlert, initialStateForm} from './util.js';

// Функция для получения данных с сервера
const getServerData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => showAlert('Не удалось получить данные. Попробуйте перезагрузить страницу!'));
};

// Функция для отправки данных формы на сервер
const sendDataToServer = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
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
  });
};

export {getServerData, setAdSubmit, setClearAdForm};
