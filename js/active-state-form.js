import {settingsForm} from './setting-form.js';

// Функция для отмены режимов "неактивно";
const removeDisabled = (disabledElements) => {
  disabledElements.forEach((disabledElement) => {
    disabledElement.classList.remove('ad-form--disabled');
    const formElements = disabledElement.querySelectorAll('fieldset, select')
    formElements.forEach((element) => {
      element.disabled = false;
    });
  });
};

// Функция для запрета ручного редактирования поля адрес;
const readOnlyStage = (element) => {
  element.readOnly = true;
};

// Функция активного режима
const activeStateForm = (disabledElements, readOnlyElement) => {
  removeDisabled(disabledElements);
  readOnlyStage(readOnlyElement);
  settingsForm();
};

export {activeStateForm};
