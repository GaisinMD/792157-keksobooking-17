// Выполняемые задачи: Генерация галлерии на главной странице
// Зависимости: constants.js, utils.js

'use strict';

window.flatList = (function () {
  var MAX_PINS = 5;
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var housingFilterList = {
    housingType: document.querySelector('#housing-type'),
    housingPrice: document.querySelector('#housing-price'),
    housingRooms: document.querySelector('#housing-rooms'),
    housingGuests: document.querySelector('#housing-guests'),
    housingFeatures: document.querySelector('#housing-features').querySelectorAll('input'),
  };
  var filterTypes = [
    'type',
    'rooms',
    'guests'
  ];
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var CARD = {
    title: cardTemplate.querySelector('.popup__title'),
    address: cardTemplate.querySelector('.popup__text--address'),
    price: cardTemplate.querySelector('.popup__text--price'),
    type: cardTemplate.querySelector('.popup__type'),
    roomsGuests: cardTemplate.querySelector('.popup__text--capacity'),
    time: cardTemplate.querySelector('.popup__text--time'),
    features: cardTemplate.querySelector('.popup__features'),
    description: cardTemplate.querySelector('.popup__description'),
    photos: cardTemplate.querySelector('.popup__photos'),
    avatar: cardTemplate.querySelector('.popup__avatar'),
    close: cardTemplate.querySelector('.popup__close'),
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
    var featuresList = CARD.features.querySelectorAll('li');
    window.utils.removeChildren(CARD.features, featuresList);
    for (var i = 0; i < list.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.className = featureItemClass + list[i];
      fragment.appendChild(featureItem);
    }
    CARD.features.appendChild(fragment);
  };

  var generateFlatPhotos = function (list) {
    var photosList = CARD.photos.querySelectorAll('img');
    window.utils.removeChildren(CARD.photos, photosList);
    for (var i = 0; i < list.length; i++) {
      var photoItem = document.createElement('img');
      photoItem.className = photoClass;
      photoItem.width = photoWidth;
      photoItem.height = photoHeight;
      photoItem.src = list[i];
      photoItem.alt = photoAlt;
      fragment.appendChild(photoItem);
    }
    CARD.photos.appendChild(fragment);
  };

  var hideCard = function () {
    window.utils.hideElement(cardTemplate);
    CARD.close.removeEventListener('click', hideCard);
    document.removeEventListener('keydown', onCardPressEsc);
  };

  var onCardPressEsc = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      hideCard();
    }
  };

  var generateCard = function (item) {
    CARD.title.textContent = item.offer.title;
    CARD.address.textContent = item.offer.address;
    CARD.price.textContent = '' + item.offer.price + priceUnitText;
    CARD.type.textContent = houseTypes[item.offer.type];
    CARD.roomsGuests.textContent = item.offer.rooms + roomsText + item.offer.guests + guestsText;
    CARD.time.textContent = chekInText + item.offer.checkin + chekOutText + item.offer.checkout;
    generateFlatFeatures(item.offer.features);
    CARD.description.textContent = item.offer.description;
    generateFlatPhotos(item.offer.photos);
    CARD.avatar.src = item.author.avatar;
    CARD.close.addEventListener('click', hideCard);
    document.addEventListener('keydown', onCardPressEsc);

    window.constants.mapFilter.before(fragment.appendChild(cardTemplate));
    window.utils.showElement(cardTemplate);
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
    window.constants.pinList.appendChild(fragment);
  };

  var clearPins = function () {
    var pins = window.constants.mapPins.querySelectorAll('button[type="button"]');
    window.utils.removeChildren(window.constants.mapPins, pins);
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
    if (housingFilterList.housingPrice.value !== 'any') {
      resultByPrice = list.filter(function (element) {
        return (Prices[housingFilterList.housingPrice.value][0] <= element.offer.price && element.offer.price < Prices[housingFilterList.housingPrice.value][1]);
      });
    } else {
      resultByPrice = list;
    }
    return resultByPrice;
  };

  var sortFlatsbyFeatures = function (list) {
    var resultByFeatures = [];
    var featuresFilter = [];
    for (var i = 0; i < housingFilterList.housingFeatures.length; i++) {
      if (housingFilterList.housingFeatures[i].checked === true) {
        featuresFilter.push(housingFilterList.housingFeatures[i].value);
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
    result = sortFlatsbyType(result, filterTypes[0], housingFilterList.housingType);
    result = sortFlatsbyPrice(result);
    result = sortFlatsbyType(result, filterTypes[1], housingFilterList.housingRooms);
    result = sortFlatsbyType(result, filterTypes[2], housingFilterList.housingGuests);
    result = sortFlatsbyFeatures(result);
    hideCard();
    generateFlatList(result);
  };

  var activateFilter = function () {
    filterItems.forEach(function (element) {
      element.addEventListener('change', function () {
        window.utils.setDebounce(sortFlats)();
      });
    });
  };

  activateFilter();

  /* housingFilterList.housingType.addEventListener('change', function (evt) {
    evt.preventDefault();
    sortFlats(window.constants.PIN_LIST);
  });

  housingFilterList.housingPrice.addEventListener('change', function (evt) {
    evt.preventDefault();
    sortFlats(window.constants.PIN_LIST);
  });

  housingFilterList.housingRooms.addEventListener('change', function (evt) {
    evt.preventDefault();
    sortFlats(window.constants.PIN_LIST);
  });

  housingFilterList.housingGuests.addEventListener('change', function (evt) {
    evt.preventDefault();
    sortFlats(window.constants.PIN_LIST);
  });*/

  return {
    clearPins: clearPins,
    generateFlatList: generateFlatList,
    sortFlatsbyType: sortFlatsbyType,
    hideCard: hideCard,
  };

})();
