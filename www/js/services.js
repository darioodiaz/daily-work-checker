angular.module('dailyWorkChecker.services').factory('DailyWorkService', DailyWorkService);

DailyWorkService.$inject = ['$window', 'dailyWorkConstants', '$q'];
function DailyWorkService($window, dailyWorkConstants, $q) {
  var srv = { check: check, getDisabledDates: getDisabledDates };

  function check(time, date, state) { return commonAction( state == dailyWorkConstants.CHECKIN, time, date); };
  function getDisabledDates() {
    var dates = [], temp, data = getData();
    for(var prop in data) { temp = prop.split('-'); dates.push( new Date(temp[2], temp[1], temp[0]) ); }
    return dates;
  };

  function commonAction(isCheckin, time, date) {
    var defer = $q.defer();
  	var data = getData();
    var key = toKey(date);
    if (isCheckin) {
      if (data[key]) {
        defer.reject('You have already did checkin.');
      } else {
        data[key] = { checkin: time.getHours() };
        $window.localStorage.dailyWorkCheckerData = JSON.stringify(data);
        defer.resolve('success');
      }
    } else {
      if(typeof(data[key]) === 'undefined') {
        defer.reject('You must do checkin first.');
      } else if ('checkout' in data[key]) {
        defer.reject('You have already did checkout.');
      } else {
        data[key].checkout = time.getHours();
        data[key].hours = data[key].checkout - parseInt(data[key].checkin);
        $window.localStorage.dailyWorkCheckerData = JSON.stringify(data);
        defer.resolve('success');
      }
    }
    return defer.promise;
  };
  function toKey(date) { return date.getDate() + " - " + date.getMonth() + " - " + date.getFullYear(); };
  function getData() { return JSON.parse($window.localStorage.dailyWorkCheckerData || '{}'); };

  return srv;
};
