/* @ngInject */
export function quicksearchRun($templateCache) {
  $templateCache.put(
    'globalsearch.popup.template.html',
    require('html-loader!./globalsearch.popup.template.html')
  );
}
