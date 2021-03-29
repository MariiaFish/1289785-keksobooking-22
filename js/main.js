import {adDisabled, DISABLED_ELEMENTS, onSuccessSendData, setClearAdForm, setAdSubmit} from './form-mode.js';
import  {renderMapInActiveState} from './map-active-set.js';
import {adForm} from './setting-form.js'

const clearButton = adForm.querySelector('.ad-form__reset');

adDisabled(DISABLED_ELEMENTS);
renderMapInActiveState();

// Добавили обработчик на кнопку отправки
setAdSubmit(onSuccessSendData);

// Добавили обработчик на кнопку отчистки формы
setClearAdForm(clearButton);
