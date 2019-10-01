// Выполняемые задачи: Библиотека констант
// Зависимости:

'use strict';

window.constants = (function () {

  return {
    ESC_KEYCODE: 27,

    PIN_SIZES: {
      width: 50,
      height: 70
    },

    PIN_LIST: [],

    MAIN_TAG: document.querySelector('main'),
    MAP: document.querySelector('.map'),
    MAP_PINS: document.querySelector('.map__pins'),

    AD_FORM: document.querySelector('.ad-form'),
    AD_FORM_HEADER: document.querySelector('.ad-form-header'),
    AD_FORM_FIELDS: document.querySelectorAll('.ad-form__element'),
    AD_FORM_FIELD_ADRRESS: document.querySelector('#address'),

  };

})();
