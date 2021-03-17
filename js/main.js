import {adDisabled, DISABLED_ELEMENTS, clearButton, onSuccessSendData} from './form-mode.js';
import  {renderMapInActiveState} from './map-active-set.js';
import {setClearAdForm, setAdSubmit} from './api-data.js';

adDisabled(DISABLED_ELEMENTS);
renderMapInActiveState();

// Добавили обработчик на кнопку отправки
setAdSubmit(onSuccessSendData);

// Добавили обработчик на кнопку отчистки формы
setClearAdForm(clearButton);
