// Выполняемые задачи: запуск логики
// Зависимости: constants.js

'use strict';

(function () {
  var MIN_PERCENT_X = -2;
  var MIN_PERCENT_Y = 15;
  var MAX_PERCENT_X = 97;
  var MAX_PERCENT_Y = 89;
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


  var setCoordinate = function (coordinateX, coordinateY) {
    var mainPinCoordinates = MAIN_PIN.getBoundingClientRect();
    var mainPinCoordinatesX = mainPinCoordinates.x - window.constants.mapCoordinates.x;
    var mainPinCoordinatesY = mainPinCoordinates.y - window.constants.mapCoordinates.y;
    window.constants.adFormFieldAddress.value =
    '' + Math.round(mainPinCoordinatesX + window.constants.MAIN_PIN_SIZES.width / 2) +
    ', ' + Math.round(mainPinCoordinatesY + window.constants.MAIN_PIN_SIZES.height);
    console.log(coordinateX, coordinateY);
    MAIN_PIN.style = 'left:' + coordinateX + '%; top:' + coordinateY + '%';
  };

  var activateMain = function () {
    if (window.constants.map.classList.contains('map--faded')) {
      window.backend.load(URL, window.flatList.generateFlatList, window.utils.onErrorMessage);
      window.constants.map.classList.remove('map--faded');
    }
    if (window.constants.adForm.classList.contains('ad-form--disabled')) {
      window.constants.adForm.classList.remove('ad-form--disabled');
    }
    window.constants.adFormHeader.removeAttribute('disabled');
    for (var i = 0; i < window.constants.adFormFields.length; i++) {
      window.constants.adFormFields[i].removeAttribute('disabled');
    }
  };

  var getEffectValue = function (percentX, percentY) {
    activateMain();
    if (percentX >= MIN_PERCENT_X && percentX <= MAX_PERCENT_X) {
      if (percentY >= MIN_PERCENT_Y && percentY <= MAX_PERCENT_Y) {
        setCoordinate(percentX, percentY);
      }
    }
  };

  var setMinPrice = function () {
    price.setAttribute('placeholder', houseTypeMinPrices[type.value]);
    price.setAttribute('min', houseTypeMinPrices[type.value]);
  };

  setCoordinate(50, 50);
  // MAIN_PIN.addEventListener('click', activateMain);
  // MAIN_PIN.addEventListener('mouseup', setCoordinate);
  window.utils.setSlider(MAIN_PIN, window.constants.mapPins, getEffectValue);
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
