angular.module('dailyWorkChecker.services').factory('DailyWorkService', DailyWorkService);

DailyWorkService.$inject = ['$window', 'dailyWorkConstants', '$q', 'googleSpreadSheetService'];
function DailyWorkService($window, dailyWorkConstants, $q, googleSpreadSheetService) {
  var srv = { check: check, getDisabledDates: getDisabledDates };

  function check(time, date, state) { return commonAction( state == dailyWorkConstants.CHECKIN, time, date); };
  function getDisabledDates() {
    var dates = [], temp, data = getData();
    for(var prop in data) { temp = prop.split('-'); dates.push( new Date(temp[2], temp[1], temp[0]) ); }
    return dates;
  };
  function commonAction(isCheckin, time, date) {
    var defer = $q.defer(); var data = getData(); var key = toKey(date);
    if (isCheckin) {
      if (data[key]) {
        defer.reject('You have already did checkin.');
      } else {
        data[key] = { checkin: time.getHours() + ':' + time.getMinutes(), hours: time.getHours() };
        $window.localStorage.dailyWorkCheckerData = JSON.stringify(data);
        defer.resolve('success');
      }
    } else {
      if(typeof(data[key]) === 'undefined') {
        defer.reject('You must do checkin first.');
      } else if ('checkout' in data[key]) {
        defer.reject('You have already did checkout.');
      } else {
        data[key].checkout = time.getHours() + ':' + time.getMinutes();
        data[key].hours = time.getHours() - parseInt(data[key].hours);
        $window.localStorage.dailyWorkCheckerData = JSON.stringify(data);
        return googleSpreadSheetService.addWorkedDay(
            [key, data[key].checkin, data[key].checkout, '', data[key].hours]
          ).then( onSuccess.bind(defer), onFail.bind(defer) );
      }
    }
    return defer.promise;
  };
  function onSuccess(data) {
    return this.resolve('SUCCESS');
  };
  function onFail(reason) {
    return this.reject(reason);
  };
  function toKey(date) { return date.getDate() + "/" + (date.getMonth() + 1 < 9 ? '0'.concat( date.getMonth() + 1 ) : date.getMonth() + 1) + "/" + date.getFullYear(); };
  function getData() { return JSON.parse($window.localStorage.dailyWorkCheckerData); };

  return srv;
};
