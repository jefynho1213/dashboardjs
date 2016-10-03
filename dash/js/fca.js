angular.module("fca", []);
angular.module("fca").directive("chart", function () {
	return  {
		templateUrl : "/dash/components/templates/simpleChart.html",
		scope : {
			json : '@',
			title : '@',
			namecounter : '@'
		}, 
		controller : function ($scope, $element, $http) {
			$scope.modal = $scope.title + "modal";
			$http.get($scope.json).success(function(data){
				$scope.data = data;
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
		       

				chart($scope.data, $scope.title, $scope.namecounter, $scope.modal);

			});
			
		}
	}
}).directive("mchart", function () {
	return {
		templateUrl : '/dash/components/templates/simpleChart.html',
		scope : {
			names :'=',
			json : '@',
			title : '@'

		},
		controller : function($http, $scope, $element){
			
				$scope.modal = $scope.title + "modal";
			function chart(json, names, title, modal) 
			{

			    var seriesOptions = [],
			        seriesCounter = 0,
			        names = names;

			    /**
			     * Create the chart when all data is loaded
			     * @returns {undefined}
			     */
	    		function createChart() 
	    		{


			        $('#' + title).highcharts('StockChart', 
			        {
						
						title : 
						{
			                text : title
			            },

			            rangeSelector: 
			            {
			                selected: 4
			            },

			            yAxis: 
			            {
			                plotLines: 
			                [{
			                    color: 'silver'
			                }]
			            },
						


			            plotOptions: 
			            {
			                
			            },

			            tooltip: 
			            {
			                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
			                valueDecimals: 2
			            },

			            series: seriesOptions
			        });
			        $('#' + modal).highcharts('StockChart', 
			        {
						
						title : 
						{
			                text : title
			            },

			            rangeSelector: 
			            {
			                selected: 4
			            },

			            yAxis: 
			            {
			                plotLines: 
			                [{
			                    color: 'silver'
			                }]
			            },
						


			            plotOptions: 
			            {
			                
			            },

			            tooltip: 
			            {
			                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
			                valueDecimals: 2
			            },

			            series: seriesOptions
			        });
			    }

			    $.each(names, function (i, name, json) 
			    {


			        $http.get($scope.json+name).success(function (data) 
			        {

			            seriesOptions[i] = 
			            {
			                name: name,
			                data: data
			            };

			            // As we're loading the data asynchronously, we don't know what order it will arrive. So
			            // we keep a counter and create the chart when all the data is loaded.
			            seriesCounter += 1;

			            if (seriesCounter === names.length) 
			            {
			                createChart();
			            }
			        });
			    });
			};
			chart($scope.json, $scope.names, $scope.title, $scope.modal);
		}
	}

})
.config(function($httpProvider) {
	$httpProvider.interceptors.push("loading");
})
.factory('loading', function($q, $rootScope, $timeout){
	return {
		request: function (config) {
			$rootScope.loadingPage = true;
			return config;
		},
		requestError: function (rejection) {
			$rootScope.loadingPage = false;
			return $q.reject(rejection);
		},
		response : function(response){
			$timeout(function (){
				$rootScope.loadingPage = false;
			}, 2000);
			return response;
		},
		responseError: function(rejection){
			$rootScope.loadingPage = false;
			return $q.rejection(rejection);
		}
		
	};
})
