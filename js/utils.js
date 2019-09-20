// Выполняемые задачи: Утилиты
// Зависимости: constants.js

'use strict';

window.utils = (function () {
  var DEBOUNCE_INTERVAL = 500;

  return {
    // установка задержки
    setDebounce: function (callback) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          callback.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },

    // показать элемент DOM
    showElement: function (element) {
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
      }
    },

    // скрыть элемент DOM
    hideElement: function (element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    },

    // очистка DOM узла
    removeChildren: function (parent, children) {
      for (var i = 0; i < children.length; i++) {
        parent.removeChild(children[i]);
      }
    },

    // случайное целое число
    getRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },

    // перемешивание массива
    shuffleList: function (list) {
      var y;
      var x;
      for (var i = list.length - 1; i > 0; i--) {
        y = window.utils.getRandomInteger(0, i);
        x = list[i];
        list[i] = list[y];
        list[y] = x;
      }
      return list;
    },

    // слайдер
    setSlider: function (pin, callback) {
      pin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        var startCoordsX = evt.clientX;
        var startCoordsY = evt.clientY;

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          var shiftX = startCoordsX - moveEvt.clientX;
          var shiftY = startCoordsY - moveEvt.clientY;

          startCoordsX = moveEvt.clientX;
          startCoordsY = moveEvt.clientY;
          callback((pin.offsetLeft - shiftX), (pin.offsetTop - shiftY));
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    },

    // сообщение об ошибке закрузки
    onErrorMessage: function (code) {
      var popup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      var inner = popup.querySelector('.error__button');
      var header = popup.querySelector('.error__message');

      var hidePopup = function (element) {
        window.constants.mainTag.removeChild(element);
        document.removeEventListener('keydown', onEscPress);
      };

      var onEscPress = function (evt) {
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
          hidePopup(popup);
        }
      };

      inner.addEventListener('click', function (evt) {
        evt.preventDefault();
        hidePopup(popup);
      });

      document.addEventListener('keydown', onEscPress);

      header.textContent = header.textContent + ': ' + code;
      window.constants.mainTag.appendChild(popup);
    },

    // сообщение об успехе закрузки
    onSuccessMessage: function (code) {
      if (code) {
        var popup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

        var hidePopup = function (element) {
          window.constants.mainTag.removeChild(element);
          document.removeEventListener('keydown', onEscPress);
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

        window.constants.mainTag.appendChild(popup);
      }
    },

  };

})();
