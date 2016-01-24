angular.module('dailyWorkChecker.controllers')
  .controller('CheckCtrl', CheckCtrl);

CheckCtrl.$inject = ['DailyWorkService', '$ionicPopup', '$state', '$scope', 'dailyWorkConstants', '$cordovaDatePicker'];
function CheckCtrl(dailyWorkService, $ionicPopup, $state, $scope, dailyWorkConstants, $cordovaDatePicker) {
  var ctrl = this;
  ctrl.datepickerConf = {
    inputDate: new Date(), mondayFirst: false, templateType: 'popup', showTodayButton: 'true',
    callback: onDateSelect, dateFormat: 'dd-MM-yyyy', closeOnSelect: true,
    disabledDates: dailyWorkService.getDisabledDates()
  };
  ctrl.check = check;
  ctrl.openTimeSelector = openTimeSelector;

  var timeOptions = {
    date: new Date(), mode: 'time',
    doneButtonLabel: 'Set', doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'Cancel', cancelButtonColor: '#000000'
  };

  $scope.$on('$stateChangeSuccess', onStateChangeSuccess);

  function onDateSelect(date) { if (typeof(date) !== 'undefined') { ctrl.datepickerConf.inputDate = date; } };
  function onStateChangeSuccess(e, toState, toParams, fromState) {
  	ctrl.STATE_CONSTANT = toState.name == 'index.checkin' ? dailyWorkConstants.CHECKIN : dailyWorkConstants.CHECKOUT;
  	ctrl.title = toState.name == 'index.checkin' ? dailyWorkConstants.CHECKIN_TITLE : dailyWorkConstants.CHECKOUT_TITLE;
  	ctrl.datepickerConf.inputDate = new Date();
  	ctrl.checkTime = new Date();
  };
  function check(event) {
  	event.preventDefault();
  	dailyWorkService
      .check(ctrl.checkTime, ctrl.datepickerConf.inputDate, ctrl.STATE_CONSTANT)
      .then(onCheckSuccess, onCheckFail);

    function onCheckSuccess() { $ionicPopup.show({ title: ctrl.title.concat('successful'), buttons: [{ text: 'Ok', type: 'button-positive', onTap: goBack }] }); };
    function onCheckFail(reason) { $ionicPopup.show({ title: 'ERROR: ' + reason, buttons: [{ text: 'Ok', type: 'button-positive' }] }); };
  };

  function openTimeSelector() {
    $cordovaDatePicker.show(timeOptions).then(onTimeSelectorSuccess);
    function onTimeSelectorSuccess(date) { ctrl.checkTime = date; };
  };

  function goBack() { $state.go('index.summary'); };

};