// Выполняемые задачи: загрузка данных
// Зависимости:

'use strict';

window.backend = (function () {
  var CODE_SUCCESS = 200;

  return {
    load: function (url, onLoad, onError) {
      var XHR = new XMLHttpRequest();
      XHR.responseType = 'json';

      XHR.addEventListener('load', function () {
        if (XHR.status === CODE_SUCCESS) {
          onLoad(XHR.response);
        } else {
          onError(XHR.status);
        }
      });

      XHR.open('GET', url);
      XHR.send();
    },

    save: function (url, data, onLoad, onError) {
      var XHR = new XMLHttpRequest();
      XHR.responseType = 'json';

      XHR.addEventListener('load', function () {
        if (XHR.status === CODE_SUCCESS) {
          onLoad(XHR.response);
        } else {
          onError(XHR.status);
        }
      });

      XHR.open('POST', url);
      XHR.send(data);
    }

  };

})();
