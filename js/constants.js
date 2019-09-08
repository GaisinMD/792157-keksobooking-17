// Выполняемые задачи: Библиотека констант и переменных для формы редактирования
// Зависимости:

'use strict';

window.constants = (function () {

  return {
    PIN_SIZES: {
      width: 50,
      height: 70
    },
    MAIN_PIN_SIZES: {
      width: 65,
      height: 70
    },
    mainTag: document.querySelector('main'),
    map: document.querySelector('.map'),
    mapPins: document.querySelector('.map__pins'),
    mapCoordinates: document.querySelector('.map').getBoundingClientRect(),
    adForm: document.querySelector('.ad-form'),
    adFormHeader: document.querySelector('.ad-form-header'),
    adFormFields: document.querySelectorAll('.ad-form__element'),
    adFormFieldAddress: document.querySelector('#address'),
    pinList: document.querySelector('.map__pins'),

  };

})();
