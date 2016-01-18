var dependencies = ['ionic', 
                    'ionic-datepicker',
                    'ngCordova',
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

onModuleRun.$inject = ['$ionicPlatform'];
function onModuleRun($ionicPlatform) {
  $ionicPlatform.ready(onAppReady);
  function onAppReady() {
  	if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) { cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); cordova.plugins.Keyboard.disableScroll(true); }
  	if (window.StatusBar) { StatusBar.styleDefault(); }
  };
};