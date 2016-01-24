window.onerror = function(msg, file, line, col, error) {
    StackTrace.fromError(error).then(callback).catch(errback);
    function callback(stackframes) {
    	var stack = stackframes.map(function(sf) {
    		return sf.toString();
  		}).join('\n');
  		console.log(stack);
	};
	function errback(err) { console.warn(err.message); };
};

function loadGAPIScript() {
	gapi.auth.authorize({ 
		'client_id': '406884663908-20ni4jbp510712kl060q04f4bum39agl.apps.googleusercontent.com',
         'scope': 'https://www.googleapis.com/auth/spreadsheets',
         'immediate': isAuthenticated()
     }, handleAuthResult);
	function handleAuthResult(authResult) {
		if (authResult && !authResult.error) {
			console.log("Can use GAPI script");
			var dailyWorkCheckerData = JSON.parse(window.localStorage.dailyWorkCheckerData || '{}');
			dailyWorkCheckerData.gapiAuthenticated = true;
			window.localStorage.dailyWorkCheckerData = JSON.stringify(dailyWorkCheckerData);
			angular.bootstrap(document.body, ['dailyWorkChecker']);
		} else {
			console.log("ERROR Authenticating: ", authResult);
		}
	};
	function isAuthenticated() { 
		return window.localStorage.dailyWorkCheckerData && window.localStorage.dailyWorkCheckerData.gapiAuthenticated; 
	};
};

function bootstrapApp() { angular.bootstrap(document.body, ['dailyWorkChecker']); };