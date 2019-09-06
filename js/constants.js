// Выполняемые задачи: Библиотека констант и переменных для формы редактирования
// Зависимости:

'use strict';

window.constants = (function () {

  return {
    PIN_SIZES: {
      width: 50,
      height: 70
    },
    mainTag: document.querySelector('main'),
    pinList: document.querySelector('.map__pins'),

  };

})();
