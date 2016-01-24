
angular.module('dailyWorkChecker.services').constant('gapiConstants', {
	'SCRIPT_ID': 'Mjvti_3nH3zyBNWxHjEWsYc5aheiueBoC',
	'SHEET_ID': 'YOUR_SHEET_ID'
});
angular.module('dailyWorkChecker.services').factory('googleSpreadSheetService', constructor);
constructor.$inject = ['$q', 'gapiConstants', '$window'];
function constructor($q, gapiConstants, $window) {
	var self = this;
	var srv = { addWorkedDay: addWorkedDay };

	function executeScript(values, defer) {
        var request = { 'function': 'add', 'parameters': [ gapiConstants.SHEET_ID, values] };
        var op = $window.gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + gapiConstants.SCRIPT_ID + ':run',
            'method': 'POST',
            'devMode': true,
            'body': request
        });
        op.execute( onGoogleAPIExecute.bind(defer) );
	};
	function onGoogleAPIExecute(resp) {
		if (resp.error && resp.error.status) {
			console.error("ERROR GAPI: ", resp.error, " - ", resp.error.status);
			this.reject(resp.error);
		} else if (resp.error) {
			console.error("ERROR GAPI: ", resp.error);
			this.reject(resp.error.details[0]);
		} else {
			console.log("GAPI success: ", resp.response.result);
			this.resolve(resp.response.result);
		}
	};
	function addWorkedDay(values) {
		var defer = $q.defer();
		executeScript(values, defer);
		return defer.promise;		
	};
	return srv;
};