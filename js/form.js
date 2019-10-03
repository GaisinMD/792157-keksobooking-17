// Выполняемые задачи: работа с формой подачи объявления
// Зависимости: constants.js

'use strict';

window.announcementForm = (function () {
  var SAVE_URL = 'https://js.dump.academy/keksobooking';

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

  var AD_FORM_RESET = document.querySelector('.ad-form__reset');

  var TIME_IN = document.querySelector('#timein');
  var TIME_OUT = document.querySelector('#timeout');
  var TYPE = document.querySelector('#type');
  var PRICE = document.querySelector('#price');
  var ROOM_NUMBER = document.querySelector('#room_number');
  var CAPACITY = document.querySelector('#capacity');

  var UPLOAD_FILE_AVATAR = document.querySelector('#avatar');
  var DEFAULT_FILE_AVATAR_SOURCE = 'img/muffin-grey.svg';
  var UPLOAD_FILE_AD_FORM = document.querySelector('#images');
  var AVATAR = document.querySelector('.ad-form-header__preview').querySelector('img');
  var AD_FORM_IMAGE_CONTAINER = document.querySelector('.ad-form__photo-container');
  var AD_FORM_IMAGE_CLASS = '.ad-form__photo';
  var IMAGE_TEMPLATE = document.querySelector('#ad_photo').content.querySelector('.ad-form__photo');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ERROR_FILE_TYPE_MESSAGE = 'Неверный тип файла';

  var createAvatar = function (img, reader) {
    img.src = reader.result;
  };

  var createImagesAdForm = function (img, reader) {
    img.querySelector('img').src = reader.result;
    AD_FORM_IMAGE_CONTAINER.appendChild(img);
  };

  var validateLoad = function (target, img) {
    var file = target.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (target === UPLOAD_FILE_AVATAR) {
            createAvatar(img, reader);
          }
          if (target === UPLOAD_FILE_AD_FORM) {
            createImagesAdForm(IMAGE_TEMPLATE.cloneNode(true), reader);
          }
        });
        reader.readAsDataURL(file);
      } else {
        window.utils.onErrorMessage(ERROR_FILE_TYPE_MESSAGE);
      }
    }
    return img;
  };

  var setMinPrice = function () {
    PRICE.setAttribute('placeholder', houseTypeMinPrices[TYPE.value]);
    PRICE.setAttribute('min', houseTypeMinPrices[TYPE.value]);
  };

  var deActivateMain = function () {
    if (!window.constants.MAP.classList.contains('map--faded')) {
      window.constants.MAP.classList.add('map--faded');
    }
    if (!window.constants.AD_FORM.classList.contains('ad-form--disabled')) {
      window.constants.AD_FORM.classList.add('ad-form--disabled');
    }
    window.constants.AD_FORM_HEADER.setAttribute('disabled', 'disabled');
    for (var i = 0; i < window.constants.AD_FORM_FIELDS.length; i++) {
      window.constants.AD_FORM_FIELDS[i].setAttribute('disabled', 'disabled');
    }

    window.constants.AD_FORM.reset();
    setMinPrice();
    AVATAR.src = DEFAULT_FILE_AVATAR_SOURCE;
    window.utils.removeChildren(AD_FORM_IMAGE_CONTAINER, AD_FORM_IMAGE_CONTAINER.querySelectorAll(AD_FORM_IMAGE_CLASS));
    window.main.inicializingMain();
    window.flatList.clearPins();
    window.flatList.hideCard();
  };

  var onSuccessLoading = function (code) {
    if (code) {
      var popup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

      var hidePopup = function (element) {
        window.constants.MAIN_TAG.removeChild(element);
        document.removeEventListener('keydown', onEscPress);
        deActivateMain();
      };

      var onEscPress = function (evt) {
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
          hidePopup(popup);
        }
      };

      document.addEventListener('keydown', onEscPress);

      popup.addEventListener('click', function () {
        hidePopup(popup);
      });

      window.constants.MAIN_TAG.appendChild(popup);
    }
  };

  var setCapacity = function (number) {
    var capacityRooms = RoomCapacity[number];
    CAPACITY[0].selected = false;

    for (var i = 0; i < CAPACITY.options.length; i++) {
      if (!capacityRooms.includes(CAPACITY.options[i].value)) {
        CAPACITY.options[i].disabled = true;
        CAPACITY.options[i].selected = false;
      } else {
        CAPACITY.options[i].disabled = false;
        CAPACITY.options[i].selected = true;
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

    window.constants.AD_FORM_FIELD_ADDRESS.disabled = false;
    window.backend.save(SAVE_URL, new FormData(window.constants.AD_FORM), onSuccessLoading, window.utils.onErrorMessage);
    window.constants.AD_FORM_FIELD_ADDRESS.disabled = true;
  };


  UPLOAD_FILE_AVATAR.addEventListener('change', function (evt) {
    validateLoad(evt.target, AVATAR);
  });

  UPLOAD_FILE_AD_FORM.addEventListener('change', function (evt) {
    validateLoad(evt.target, AVATAR);
  });

  TYPE.addEventListener('change', setMinPrice);
  TIME_IN.addEventListener('change', function () {
    TIME_OUT.value = TIME_IN.value;
  });
  TIME_OUT.addEventListener('change', function () {
    TIME_IN.value = TIME_OUT.value;
  });
  ROOM_NUMBER.addEventListener('change', function () {
    setCapacity(ROOM_NUMBER.value);
  });

  window.constants.AD_FORM.addEventListener('submit', submitForm);
  AD_FORM_RESET.addEventListener('click', deActivateMain);

})();
