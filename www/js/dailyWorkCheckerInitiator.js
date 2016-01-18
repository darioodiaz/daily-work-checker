function dailyWorkCheckerStateInitiator($stateProvider) {
	$stateProvider.state('index', { url: '', abstract: true, templateUrl: 'templates/index.html' });
	$stateProvider.state('index.summary', { 
		url: '/summary', 
		templateUrl: 'templates/summary.html',
		views: { 
			'summary': {
				templateUrl: 'templates/summary.html',
				controller: 'SummaryCtrl', 
				controllerAs: 'ctrl' 
			} 
		}
	});
	$stateProvider.state('index.checkin', { 
		url: '/checkin', 
		views: { 
			'checkin': {
				templateUrl: 'templates/check.html', 
				controller: 'CheckCtrl', 
				controllerAs: 'ctrl' 
			} 
		} 
	});
	$stateProvider.state('index.checkout', { 
		url: '/checkout', 
		views: { 
			'checkout': {
				templateUrl: 'templates/check.html', 
				controller: 'CheckCtrl', 
				controllerAs: 'ctrl' 
			} 
		} 
	});
};