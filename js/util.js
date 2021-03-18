const getRandomInt = (min, max) => {
  if (min > max) {
    let temporalMax = max;
    max = min;
    min = temporalMax;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomСoordinate = (min, max, decimalPlaces) => {
  if (min > max) {
    let temporalMax = max;
    max = min;
    min = temporalMax;
  }

  return Number((Math.random() * (max - min + 1) + min).toFixed(decimalPlaces));
};

// Функция для возврата массива случайной длинны
const getRandomArr = (array, minArrLength) => {
  const newArr = Array.from(array);
  newArr.length = getRandomInt(minArrLength, array.length);
  return newArr;
};

// Функция для возврата элемента массива
const getArrElement = (array, min) => {
  return array[getRandomInt(min, array.length-1)];
};

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
  }, 5000);
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

export {getRandomInt, getRandomСoordinate, getRandomArr, getArrElement, showAlert, closeModalOnClick, initialStateForm};
