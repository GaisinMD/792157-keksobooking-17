// Выполняемые задачи: Валидация хэштега
// Зависимости: constants.js, utils.js

'use strict';

window.customValidation = (function () {

  /*var removeSetCustomValidity = function (evt) {
    evt.target.setCustomValidity('');
    window.customValidation.HASHTAGS.style = 'border-color: #9a9a9a; background-color: white';
  };*/

  return {

    //HASHTAGS: document.querySelector('.text__hashtags'),

    validate: function (string) {
      /*var hashtags = string.value.trim();
      var inputCustomValidation;
      var customValidityMessage;

      window.customValidation.HASHTAGS.removeEventListener('input', removeSetCustomValidity);

      if (hashtags.length) {
        var array = hashtags.toLowerCase().split(SEPARATOR);

        inputCustomValidation = new window.Validation(array);
        inputCustomValidation.getReapitingHashtags();
        inputCustomValidation.getLonelyHashtag(HASHTAG_BEGINNER);
        inputCustomValidation.getSpaceHashtag(HASHTAG_BEGINNER);
        inputCustomValidation.getMiddleHashtag(HASHTAG_BEGINNER);
        inputCustomValidation.getTooLongHashtag(HASHTAG_LENGTH);
        inputCustomValidation.getTooManyHashtag(MAX_HASHTAGS_QUANTITY);
        customValidityMessage = inputCustomValidation.getInvalidities();

        if (inputCustomValidation.invalidities.length) {
          window.customValidation.HASHTAGS.setCustomValidity(customValidityMessage);
          window.customValidation.HASHTAGS.reportValidity();
          window.customValidation.HASHTAGS.addEventListener('input', removeSetCustomValidity);
          return false;
        }
      }*/
      console.log('validate');

      return true;

    }

  };

})();
