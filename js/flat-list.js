// Выполняемые задачи: Генерация галлерии на главной странице
// Зависимости: constants.js, utils.js

'use strict';

window.flatList = (function () {
  var MAX_PINS = 5;
  var housingFilterList = {
    housingType: document.querySelector('#housing-type')
  };
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var generatePin = function (template, pinItem) {
    var imgTemplate = template.querySelector('img');
    template.style = 'left: ' + (pinItem.location.x - window.constants.PIN_SIZES.width / 2) + 'px; top: ' + (pinItem.location.y - window.constants.PIN_SIZES.height) + 'px;';
    imgTemplate.src = pinItem.author.avatar;
    imgTemplate.alt = pinItem.offer.title;
    return template;
  };

  var generateFlatList = function (response) {
    var maxPins = MAX_PINS;
    maxPins = response.length < MAX_PINS ? response.length : MAX_PINS;

    for (var i = 0; i < maxPins; i++) {
      fragment.appendChild(generatePin(pinTemplate.cloneNode(true), response[i]));
    }
    window.constants.pinList.appendChild(fragment);
  };

  var sortFlatsbyType = function (list, type) {
    var pins = window.constants.mapPins.querySelectorAll('button[type="button"]');
    window.utils.removeChildren(window.constants.mapPins, pins);

    var result = list.filter(function (element) {
      return element.offer.type === type.value;
    });

    generateFlatList(result);
  };

  housingFilterList.housingType.addEventListener('change', function (evt) {
    evt.preventDefault();
    sortFlatsbyType(window.constants.PIN_LIST, evt.target);
  });

  return {
    generateFlatList: generateFlatList,
    sortFlatsbyType: sortFlatsbyType,
  };

})();
