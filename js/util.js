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

export {getRandomInt, getRandomСoordinate, getRandomArr, getArrElement};
