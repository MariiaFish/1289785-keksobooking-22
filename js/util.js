const ALERT_TIME = 5000;

// Функция для отображения ошибки
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_TIME);
}

// Закрытие окна по нажатию на кнопку
const closeModalOnClick = (clickElement, closedElement) => {
  clickElement.addEventListener('click', () => {
    closedElement.classList.add('hidden');
  });
};

// Функция возвращения формы в первоначальное состояние
const initialStateForm = (form) => {
  form.reset();
};

// Функция для поиска элемента в массиве
const findElementFromArray = (array, element) => {
  return array.find(item => item === element);
};

export {showAlert, closeModalOnClick, initialStateForm, findElementFromArray};
