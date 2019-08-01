// Выполняемые задачи: загрузка данных
// Зависимости:

'use strict';

window.backend = (function () {

  var CODE_SUCCESS = 200;
  var popup = document.querySelector('#messages').content.querySelector('.img-upload__message').cloneNode(true);

  return {
    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      window.constants.mainTag.appendChild(popup);

      xhr.addEventListener('load', function () {
        window.constants.mainTag.removeChild(popup);
        if (xhr.status === CODE_SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status);
        }
      });

      xhr.open('GET', url);
      xhr.send();
    },

    save: function (url, data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      window.constants.mainTag.appendChild(popup);

      xhr.addEventListener('load', function () {
        window.constants.mainTag.removeChild(popup);
        if (xhr.status === CODE_SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status);
        }
      });

      xhr.open('POST', url);
      xhr.send(data);
    }

  };

})();
