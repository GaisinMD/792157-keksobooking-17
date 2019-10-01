// Выполняемые задачи: Генерация галлерии на главной странице
// Зависимости: constants.js, utils.js

'use strict';

window.flatList = (function () {
  var MAX_PINS = 5;
  var MAP_FILTERS = document.querySelector('.map__filters-container');
  var FILTER_LIST = document.querySelector('.map__filters').querySelectorAll('select, input');
  var housingFilterList = {
    HOUSING_TYPE: document.querySelector('#housing-type'),
    HOUSING_PRICE: document.querySelector('#housing-price'),
    HOUSING_ROOMS: document.querySelector('#housing-rooms'),
    HOUSING_GUESTS: document.querySelector('#housing-guests'),
    HOUSING_FEATURES: document.querySelector('#housing-features').querySelectorAll('input'),
  };
  var filterTypes = [
    'type',
    'rooms',
    'guests'
  ];
  var CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.map__card');
  var card = {
    TITLE: CARD_TEMPLATE.querySelector('.popup__title'),
    ADDRESS: CARD_TEMPLATE.querySelector('.popup__text--address'),
    PRICE: CARD_TEMPLATE.querySelector('.popup__text--price'),
    TYPE: CARD_TEMPLATE.querySelector('.popup__type'),
    ROOM_GUESTS: CARD_TEMPLATE.querySelector('.popup__text--capacity'),
    TIME: CARD_TEMPLATE.querySelector('.popup__text--time'),
    FEATURES: CARD_TEMPLATE.querySelector('.popup__features'),
    DESCRIPTION: CARD_TEMPLATE.querySelector('.popup__description'),
    PHOTOS: CARD_TEMPLATE.querySelector('.popup__photos'),
    AVATAR: CARD_TEMPLATE.querySelector('.popup__avatar'),
    CLOSE: CARD_TEMPLATE.querySelector('.popup__close'),
  };
  var priceUnitText = 'Р/ночь';
  var houseTypes = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
  };
  var roomsText = ' комнаты для ';
  var guestsText = ' гостей';
  var chekInText = 'Заезд после ';
  var chekOutText = ', выезд до ';
  var featureItemClass = 'popup__feature popup__feature--';
  var photoClass = 'popup__photo';
  var photoWidth = '45';
  var photoHeight = '40';
  var photoAlt = 'Фотография жилья';

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var generateFlatFeatures = function (list) {
    var featuresList = card.FEATURES.querySelectorAll('li');
    window.utils.removeChildren(card.FEATURES, featuresList);
    for (var i = 0; i < list.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.className = featureItemClass + list[i];
      fragment.appendChild(featureItem);
    }
    card.FEATURES.appendChild(fragment);
  };

  var generateFlatPhotos = function (list) {
    var photosList = card.PHOTOS.querySelectorAll('img');
    window.utils.removeChildren(card.PHOTOS, photosList);
    for (var i = 0; i < list.length; i++) {
      var photoItem = document.createElement('img');
      photoItem.className = photoClass;
      photoItem.width = photoWidth;
      photoItem.height = photoHeight;
      photoItem.src = list[i];
      photoItem.alt = photoAlt;
      fragment.appendChild(photoItem);
    }
    card.PHOTOS.appendChild(fragment);
  };

  var hideCard = function () {
    window.utils.hideElement(CARD_TEMPLATE);
    card.CLOSE.removeEventListener('click', hideCard);
    document.removeEventListener('keydown', onCardPressEsc);
  };

  var onCardPressEsc = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      hideCard();
    }
  };

  var generateCard = function (item) {
    card.TITLE.textContent = item.offer.title;
    card.ADDRESS.textContent = item.offer.address;
    card.PRICE.textContent = '' + item.offer.price + priceUnitText;
    card.TYPE.textContent = houseTypes[item.offer.type];
    card.ROOM_GUESTS.textContent = item.offer.rooms + roomsText + item.offer.guests + guestsText;
    card.TIME.textContent = chekInText + item.offer.checkin + chekOutText + item.offer.checkout;
    generateFlatFeatures(item.offer.features);
    card.DESCRIPTION.textContent = item.offer.description;
    generateFlatPhotos(item.offer.photos);
    card.AVATAR.src = item.author.avatar;
    card.CLOSE.addEventListener('click', hideCard);
    document.addEventListener('keydown', onCardPressEsc);

    MAP_FILTERS.before(fragment.appendChild(CARD_TEMPLATE));
    window.utils.showElement(CARD_TEMPLATE);
  };

  var generatePin = function (template, pinItem) {
    var imgTemplate = template.querySelector('img');
    template.style = 'left: ' + (pinItem.location.x - window.constants.PIN_SIZES.width / 2) + 'px; top: ' + (pinItem.location.y - window.constants.PIN_SIZES.height) + 'px;';
    imgTemplate.src = pinItem.author.avatar;
    imgTemplate.alt = pinItem.offer.title;
    template.addEventListener('click', function () {
      generateCard(pinItem);
    });
    return template;
  };

  var generateFlatList = function (response) {
    var maxPins = MAX_PINS;
    maxPins = response.length < MAX_PINS ? response.length : MAX_PINS;

    for (var i = 0; i < maxPins; i++) {
      fragment.appendChild(generatePin(pinTemplate.cloneNode(true), response[i]));
    }
    window.constants.MAP_PINS.appendChild(fragment);
  };

  var clearPins = function () {
    var pins = window.constants.MAP_PINS.querySelectorAll('button[type="button"]');
    window.utils.removeChildren(window.constants.MAP_PINS, pins);
  };

  var sortFlatsbyType = function (list, type, selector) {
    var resultByType = [];
    if (selector.value !== 'any') {
      resultByType = list.filter(function (element) {
        return ('' + element.offer[type] === selector.value);
      });
    } else {
      resultByType = list;
    }
    return resultByType;
  };

  var sortFlatsbyPrice = function (list) {
    var resultByPrice = [];
    var Prices = {
      low: [0, 10000],
      middle: [10000, 50000],
      high: [50000, Infinity]
    };
    if (housingFilterList.HOUSING_PRICE.value !== 'any') {
      resultByPrice = list.filter(function (element) {
        return (Prices[housingFilterList.HOUSING_PRICE.value][0] <= element.offer.price && element.offer.price < Prices[housingFilterList.HOUSING_PRICE.value][1]);
      });
    } else {
      resultByPrice = list;
    }
    return resultByPrice;
  };

  var sortFlatsbyFeatures = function (list) {
    var resultByFeatures = [];
    var featuresFilter = [];
    for (var i = 0; i < housingFilterList.HOUSING_FEATURES.length; i++) {
      if (housingFilterList.HOUSING_FEATURES[i].checked === true) {
        featuresFilter.push(housingFilterList.HOUSING_FEATURES[i].value);
      }
    }

    resultByFeatures = list.filter(function (element) {
      return (featuresFilter.every(function (el) {
        return element.offer.features.includes(el);
      }));
    });

    return resultByFeatures;
  };

  var sortFlats = function () {
    var result = window.constants.PIN_LIST;
    clearPins();
    result = sortFlatsbyType(result, filterTypes[0], housingFilterList.HOUSING_TYPE);
    result = sortFlatsbyPrice(result);
    result = sortFlatsbyType(result, filterTypes[1], housingFilterList.HOUSING_ROOMS);
    result = sortFlatsbyType(result, filterTypes[2], housingFilterList.HOUSING_GUESTS);
    result = sortFlatsbyFeatures(result);
    hideCard();
    generateFlatList(result);
  };

  var activateFilter = function () {
    FILTER_LIST.forEach(function (element) {
      element.addEventListener('change', function () {
        window.utils.setDebounce(sortFlats)();
      });
    });
  };

  activateFilter();

  return {
    clearPins: clearPins,
    generateFlatList: generateFlatList,
    sortFlatsbyType: sortFlatsbyType,
    hideCard: hideCard,
  };

})();
