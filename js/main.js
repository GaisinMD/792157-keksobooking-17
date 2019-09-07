// Выполняемые задачи: запуск логики
// Зависимости:

'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var MAIN_PIN = document.querySelector('.map__pin--main');

  var setCoordinate = function () {
    var mainPinCoordinates = MAIN_PIN.getBoundingClientRect();
    var mainPinCoordinatesX = mainPinCoordinates.x - window.constants.mapCoordinates.x;
    var mainPinCoordinatesY = mainPinCoordinates.y - window.constants.mapCoordinates.y;
    window.constants.adFormFieldAddress.value = '' + Math.round(mainPinCoordinatesX - window.constants.MAIN_PIN_SIZES.width / 2) + ', ' + Math.round(mainPinCoordinatesY + window.constants.MAIN_PIN_SIZES.height);
  };

  var activateMain = function () {
    window.backend.load(URL, window.flatList.generateFlatList, window.utils.onErrorMessage);
    if (window.constants.map.classList.contains('map--faded')) {
      window.constants.map.classList.remove('map--faded');
    }
    if (window.constants.adForm.classList.contains('ad-form--disabled')) {
      window.constants.adForm.classList.remove('ad-form--disabled');
    }
    window.constants.adFormHeader.removeAttribute('disabled');
    for (var i = 0; i < window.constants.adFormFields.length; i++) {
      window.constants.adFormFields[i].removeAttribute('disabled');
    }
    MAIN_PIN.removeEventListener('click', activateMain);
  };

  setCoordinate();
  MAIN_PIN.addEventListener('click', activateMain);
  MAIN_PIN.addEventListener('mouseup', setCoordinate);

})();
