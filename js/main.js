// Выполняемые задачи: запуск логики
// Зависимости:

'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  // var map = document.querySelector('.map');

  window.backend.load(URL, window.flatList.generateFlatList, window.utils.onErrorMessage);

})();
