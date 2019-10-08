/* @ngInject */
export function compareRun($templateCache) {
  $templateCache.put(
    'eventsearch.popup.template.html',
    require('html-loader!./eventsearch.popup.template.html')
  );

  $templateCache.put(
    'gamesearch.popup.template.html',
    require('html-loader!./gamesearch.popup.template.html')
  );

  $templateCache.put(
    'playersearch.popup.template.html',
    require('html-loader!./playersearch.popup.template.html')
  );
}
