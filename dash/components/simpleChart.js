angular.module("simpleChart", []);
angular.module("simpleChart").directive("chart", function () {
	return  {
		templateUrl : "/dash/components/templates/simpleChart.html",
		scope : {
			json : '@',
			title : '@',
			namecounter : '@'
		}, 
		controller : function ($scope, $element, $http) {
			$scope.modal = $scope.title + "modal";
			console.log($scope.modal);
			$http.get($scope.json).success(function(data){
				$scope.data = data;
				console.log(data);
			var chart = function (json, name, namecounter, modal) {
		  	
		        // Create the chart
		        $('#' + name).highcharts('StockChart', {

			           rangeSelector: {
			                selected: 1
			            },

			            title: {
			                text: name
			            },

			            series: [{
			                name: namecounter,
			                data: $scope.data,
			                tooltip: {
			                    valueDecimals: 2
			                }
			            }]
			        });

		         	$('#' + modal).highcharts('StockChart', {

			           rangeSelector: {
			                selected: 1
			            },

			            title: {
			                text: name
			            },

			            series: [{
			                name: namecounter,
			                data: $scope.data,
			                tooltip: {
			                    valueDecimals: 2
			                }
			            }]
			        });
				};
		        var modal = function (json, name, namecounter, modal)
		         { 
		    };

				chart($scope.data, $scope.title, $scope.namecounter, $scope.modal);
				modal($scope.data, $scope.title, $scope.namecounter, $scope.modal);
			});
			
		}
	}
});
