// Выполняемые задачи: Библиотека констант и переменных для формы редактирования
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

    mainTag: document.querySelector('main'),
    map: document.querySelector('.map'),
    mapPins: document.querySelector('.map__pins'),

    adForm: document.querySelector('.ad-form'),
    adFormHeader: document.querySelector('.ad-form-header'),
    adFormFields: document.querySelectorAll('.ad-form__element'),
    adFormFieldAddress: document.querySelector('#address'),

  };

})();
