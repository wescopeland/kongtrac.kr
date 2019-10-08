/* @ngInject */
export function noSpecialCharacters() {
  var directive = {
    require: 'ngModel',
    link: link,
    restrict: 'A'
  };
  return directive;

  function link(scope, element, attrs, modelCtrl) {
    modelCtrl.$parsers.push(function(inputValue) {
      if (inputValue == undefined) {
        return '';
      }

      var cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
      if (cleanInputValue != inputValue) {
        modelCtrl.$setViewValue(cleanInputValue);
        modelCtrl.$render();
      }

      return cleanInputValue;
    });
  }
}
