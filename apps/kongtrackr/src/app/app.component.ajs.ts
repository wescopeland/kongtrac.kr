export const appComponent = {
  template: require('html-loader!./app.component.ajs.html'),
  controller: function(MaterialCssVarsService) {
    activate();

    function activate() {
      // MaterialCssVarsService.setDarkTheme(true);
      MaterialCssVarsService.setPrimaryColor('#ba3448');
      MaterialCssVarsService.setAccentColor('#89b3f3');
    }
  }
};
