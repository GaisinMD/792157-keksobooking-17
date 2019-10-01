// Выполняемые задачи: запуск логики
// Зависимости: constants.js

'use strict';

window.main = (function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';

  var mainPin = document.querySelector('.map__pin--main');
  var mapCoordinates = document.querySelector('.map').getBoundingClientRect();

  var MIN_X = -33;
  var MIN_Y = 130;
  var MAX_X = window.constants.MAP_PINS.clientWidth - 33;
  var MAX_Y = 630;
  var GAP_Y = 70;
  var START_X = 570;
  var START_Y = 375;

  var MAIN_PIN_SIZES = {
    width: 65,
    height: 70
  };

  var MAP_FILTERS = document.querySelector('.map__filters');

  var createPinsList = function (response) {
    window.constants.PIN_LIST = response;
    window.flatList.generateFlatList(window.constants.PIN_LIST);
  };

  var activateMain = function () {
    if (window.constants.MAP.classList.contains('map--faded')) {
      window.backend.load(LOAD_URL, createPinsList, window.utils.onErrorMessage);
      window.constants.MAP.classList.remove('map--faded');
    }
    if (window.constants.AD_FORM.classList.contains('ad-form--disabled')) {
      window.constants.AD_FORM.classList.remove('ad-form--disabled');
    }
    window.constants.AD_FORM_HEADER.removeAttribute('disabled');
    for (var i = 0; i < window.constants.AD_FORM_FIELDS.length; i++) {
      window.constants.AD_FORM_FIELDS[i].removeAttribute('disabled');
    }
    MAP_FILTERS.reset();
    mainPin.removeEventListener('mousedown', activateMain);
  };

  var setAddress = function () {
    var mainPinCoordinates = mainPin.getBoundingClientRect();
    var mainPinCoordinatesX = mainPinCoordinates.x - mapCoordinates.x;
    var mainPinCoordinatesY = mainPinCoordinates.y - mapCoordinates.y - GAP_Y;
    window.constants.AD_FORM_FIELD_ADRRESS.value = '' + Math.round(mainPinCoordinatesX + MAIN_PIN_SIZES.width / 2) + ', ' + Math.round(mainPinCoordinatesY + MAIN_PIN_SIZES.height);
  };

  var setPin = function (coordinateX, coordinateY) {
    setAddress();
    mainPin.style = 'left:' + coordinateX + 'px; top:' + coordinateY + 'px';
  };

  var getEffectValue = function (coordinateX, coordinateY) {
    if (coordinateX >= MIN_X && coordinateX <= MAX_X) {
      if (coordinateY >= MIN_Y && coordinateY <= MAX_Y) {
        setPin(coordinateX, coordinateY);
      }
    }
  };

  var inicializingMain = function () {
    setPin(START_X, START_Y);
    mainPin.addEventListener('mousedown', activateMain);
  };

  inicializingMain();
  window.utils.setSlider(mainPin, getEffectValue);

  return {
    inicializingMain: inicializingMain,
  };

})();
