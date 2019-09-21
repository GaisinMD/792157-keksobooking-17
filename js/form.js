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

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var deActivateMain = function () {
    if (!window.constants.map.classList.contains('map--faded')) {
      window.constants.map.classList.add('map--faded');
    }
    if (!window.constants.adForm.classList.contains('ad-form--disabled')) {
      window.constants.adForm.classList.add('ad-form--disabled');
    }
    window.constants.adFormHeader.setAttribute('disabled', 'disabled');
    for (var i = 0; i < window.constants.adFormFields.length; i++) {
      window.constants.adFormFields[i].setAttribute('disabled', 'disabled');
    }

    window.main.inicializingMain();
    window.flatList.clearPins();
    window.flatList.hideCard();
  };

  var onSuccessLoading = function (code) {
    if (code) {
      var popup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

      var hidePopup = function (element) {
        window.constants.mainTag.removeChild(element);
        document.removeEventListener('keydown', onEscPress);
        window.constants.adForm.reset();
      };

      var onEscPress = function (evt) {
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
          hidePopup(popup);
        }
      };

      document.addEventListener('keydown', onEscPress);

      popup.addEventListener('click', function () {
        hidePopup(popup);
        deActivateMain();
      });

      window.constants.mainTag.appendChild(popup);
    }
  };

  var setMinPrice = function () {
    price.setAttribute('placeholder', houseTypeMinPrices[type.value]);
    price.setAttribute('min', houseTypeMinPrices[type.value]);
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

  var submitForm = function (evt) {
    evt.preventDefault();

    if (window.customValidation.validate()) {
      /* window.customValidation.HASHTAGS.setCustomValidity('');
      window.backend.save(window.constants.URL_SEND, new FormData(PHOTO_EDIT_FORM), window.utils.onSuccessMessage, window.utils.onErrorMessage);
      hidePhotoEditForm(window.constants.photoPreviewOverlay);*/
    } else {
      /* window.customValidation.HASHTAGS.style = 'border-color: red; background-color: pink';*/
    }

    window.constants.adFormFieldAddress.disabled = false;
    window.backend.save(window.constants.SAVE_URL, new FormData(window.constants.adForm), onSuccessLoading, window.utils.onErrorMessage);
    window.constants.adFormFieldAddress.disabled = true;
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

  window.constants.adForm.addEventListener('submit', submitForm);

})();
