// Выполняемые задачи: загрузка данных
// Зависимости:

'use strict';

window.backend = (function () {

  return {
    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.constants.CODE_SUCCESS) {
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

      xhr.addEventListener('load', function () {
        if (xhr.status === window.constants.CODE_SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status);
        }
      });

      /* let i = 0;
      for(let [name, value] of data) {
        console.log(`${i}: ${name} = ${value}`); // key1=value1, потом key2=value2
        i++;
      }
      console.log(`--------------------------------`); // key1=value1, потом key2=value2*/

      xhr.open('POST', url);
      xhr.send(data);
    }

  };

})();
