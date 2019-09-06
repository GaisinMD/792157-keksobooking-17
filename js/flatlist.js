// Выполняемые задачи: Генерация галлерии на главной странице
// Зависимости: constants.js, utils.js

'use strict';

window.flatList = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var generatePin = function (template, pinItem) {
    var imgTemplate = template.querySelector('img');
    template.style = 'left: ' + (pinItem.location.x - window.constants.PIN_SIZES.width / 2) + 'px; top: ' + (pinItem.location.y - window.constants.PIN_SIZES.height) + 'px;';
    imgTemplate.src = pinItem.author.avatar;
    imgTemplate.alt = pinItem.offer.title;
    return template;
  };

  return {
    generateFlatList: function (response) {

      response.forEach(function (elem) {
        fragment.appendChild(generatePin(pinTemplate.cloneNode(true), elem));
      });

      window.constants.pinList.appendChild(fragment);

    }
  };

})();
