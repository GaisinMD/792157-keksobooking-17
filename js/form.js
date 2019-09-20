// Выполняемые задачи: работа с формой подачи объявления
// Зависимости: constants.js

'use strict';

window.announcementForm = (function () {
  var RoomCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0'],
  };

  var houseTypeMinPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var AD_FORM = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var setMinPrice = function () {
    price.setAttribute('placeholder', houseTypeMinPrices[type.value]);
    price.setAttribute('min', houseTypeMinPrices[type.value]);
  };

  var setAddress = function () {
    var mainPinCoordinates = window.constants.mainPin.getBoundingClientRect();
    var mainPinCoordinatesX = mainPinCoordinates.x - window.constants.mapCoordinates.x;
    var mainPinCoordinatesY = mainPinCoordinates.y - window.constants.mapCoordinates.y;
    window.constants.adFormFieldAddress.value = '' + Math.round(mainPinCoordinatesX + window.constants.MAIN_PIN_SIZES.width / 2) + ', ' + Math.round(mainPinCoordinatesY + window.constants.MAIN_PIN_SIZES.height);
  };

  var setCapacity = function (number) {
    var capacityRooms = RoomCapacity[number];
    capacity[0].selected = false;

    for (var i = 0; i < capacity.options.length; i++) {
      if (!capacityRooms.includes(capacity.options[i].value)) {
        capacity.options[i].disabled = true;
        capacity.options[i].selected = false;
      } else {
        capacity.options[i].disabled = false;
        capacity.options[i].selected = true;
      }
    }
  };

  type.addEventListener('change', setMinPrice);
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });
  roomNumber.addEventListener('change', function () {
    setCapacity(roomNumber.value);
  });
  setCapacity(RoomCapacity[1]);


  window.constants.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (window.customValidation.validate()) {
      /* window.customValidation.HASHTAGS.setCustomValidity('');
      window.backend.save(window.constants.URL_SEND, new FormData(PHOTO_EDIT_FORM), window.utils.onSuccessMessage, window.utils.onErrorMessage);
      hidePhotoEditForm(window.constants.photoPreviewOverlay);*/
    } else {
      /* window.customValidation.HASHTAGS.style = 'border-color: red; background-color: pink';*/
    }

    address.disabled = false;
    window.backend.save(window.constants.SAVE_URL, new FormData(AD_FORM), window.utils.onSuccessMessage, window.utils.onErrorMessage);

  });

  return {
    setAddress: setAddress,
  };

})();
