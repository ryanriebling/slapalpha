angular.module('Plan')

/**
*
*
*/
.controller('MyPlansCtrl',['UserService', 'PlanService', '$scope', '$location', function(UserService, PlanService, $scope, $location) {
	$scope.owner = '';
	$scope.ready = false;
	$scope.plans = new PlanService.collection;
	$scope.myplans = [];
		
	// $scope.update = function() {
// 		$scope.plans.each(function(plan) {
// 			console.log(plan.title);
// 			$scope.myplans.add(plan);
// 		});
// 	};
		
	init();
	
	function setValues() {
	
	}
	
	function init() {
		if (UserService.getUser() == null) {
			$location.path('/login');
		} else {
			$scope.owner = UserService.getUser().get('username');
			$scope.plans.loadMyPlans($scope.owner).then(function(results) {
				console.log(results);
				var i = 0;
				results.each(function(plan) {
					console.log(plan);
					$scope.myplans[i] = plan;
					i = i + 1;
				});						
				$scope.ready = true;
				console.log($scope.myplans);		
			});
			console.log($scope.owner);		
		}		
	};
}]);
