// Выполняемые задачи: запуск логики
// Зависимости: constants.js

'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var MAIN_PIN = document.querySelector('.map__pin--main');
  var houseTypeMinPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');


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

  var setMinPrice = function () {
    price.setAttribute('placeholder', houseTypeMinPrices[type.value]);
    price.setAttribute('min', houseTypeMinPrices[type.value]);
  };

  setCoordinate();
  MAIN_PIN.addEventListener('click', activateMain);
  MAIN_PIN.addEventListener('mouseup', setCoordinate);
  type.addEventListener('change', setMinPrice);
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  window.constants.adForm.addEventListener('submit', function () {
    // evt.preventDefault();

    if (window.customValidation.validate()) {
      /* window.customValidation.HASHTAGS.setCustomValidity('');
      window.backend.save(window.constants.URL_SEND, new FormData(PHOTO_EDIT_FORM), window.utils.onSuccessMessage, window.utils.onErrorMessage);
      hidePhotoEditForm(window.constants.photoPreviewOverlay);*/
    } else {
      /* window.customValidation.HASHTAGS.style = 'border-color: red; background-color: pink';*/
    }

  });

})();
