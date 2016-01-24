var dependencies = ['ionic', 
                    'ionic-datepicker',
                    'ngCordova',
                    'ngCordovaOauth',
                    'dailyWorkChecker.controllers', 
                    'dailyWorkChecker.services'];

angular.module('dailyWorkChecker.controllers', []);
angular.module('dailyWorkChecker.services', []);

angular.module('dailyWorkChecker', dependencies)
  .config(onModuleConfig)
  .run(onModuleRun)
  .constant('dailyWorkConstants', { 
    'CHECKIN': 'CHECKIN', 
    'CHECKOUT': 'CHECKOUT',
    'CHECKIN_TITLE': 'Checkin !',  
    'CHECKOUT_TITLE': 'Checkout !'  
  });

onModuleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function onModuleConfig($stateProvider, $urlRouterProvider) { dailyWorkCheckerStateInitiator($stateProvider); $urlRouterProvider.otherwise('/summary'); };

onModuleRun.$inject = ['$ionicPlatform', '$cordovaOauth', '$window'];
function onModuleRun($ionicPlatform, $cordovaOauth, $window) {
  $ionicPlatform.ready(onAppReady);
  function onAppReady() {
  	if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) { cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); cordova.plugins.Keyboard.disableScroll(true); }
  	if (window.StatusBar) { StatusBar.styleDefault(); }
    var data = JSON.parse( $window.localStorage.dailyWorkCheckerData || '{}' );
    if (!data.gapiAuthenticated) {
      $cordovaOauth.google('406884663908-20ni4jbp510712kl060q04f4bum39agl.apps.googleusercontent.com', ['https://www.googleapis.com/auth/spreadsheets']).then(onSuccess, onFail);
    } else {
      $window.gapi.auth.setToken(data.gapiToken); 
    }
    function onSuccess(token) { 
      data.gapiAuthenticated = true; 
      data.gapiToken = token;
      $window.localStorage.dailyWorkCheckerData = JSON.stringify(data);
      $window.gapi.auth.setToken(token); 
    };
    function onFail(reason) { throw new Error(reason); };
  };
};