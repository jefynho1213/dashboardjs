angular.module("fca", []);
angular.module("fca").directive("chart", function () {
	return  {
		templateUrl : "/dash/components/templates/simpleChart.html",
		scope : {
			json : '@',
			title : '@',
			namecounter : '@',
			idiv : '@'
		}, 
		controller : function ($scope, $element, $http) {
			$scope.modal = $scope.idiv + "modal";
			$http.get($scope.json).success(function(data){
				$scope.data = data;
			var chart = function (json, name, idiv, namecounter, modal) {
		  	
		        // Create the chart
		        $('#' + idiv).highcharts('StockChart', {

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
		       

				chart($scope.data, $scope.title, $scope.idiv,  $scope.namecounter, $scope.modal);

			});
			
		}
	}
}).directive("mchart", function () {
	return {
		templateUrl : '/dash/components/templates/simpleChart.html',
		scope : {
			names :'=',
			json : '@',
			idiv : '@',
			title : '@',
			type : '@'

		},
		controller : function($http, $scope, $element){
					
				$scope.modal = $scope.idiv + "modal";
			function chart(json, names, idiv, title, modal, type) 
			{

			    var seriesOptions = [],
			        seriesCounter = 0,
			        names = names;
			        console.log(type);

			    /**
			     * Create the chart when all data is loaded
			     * @returns {undefined}
			     */
	    		function createChart() 
	    		{
				console.log(idiv);


			        $('#' + idiv).highcharts('StockChart', 
			        {

						title : 
						{
			                text : title
			            },

			            rangeSelector: 
			            {
			                selected: 4
			            },

						yAxis: [{
				            title: {
				                text: ''
				            }
				        }, {
				            title: {
				                text: ''
				            },
				            opposite: true
				        }],

			            plotOptions: 
			            {
			                
			            },

			            tooltip: 
			            {
			                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
			                valueDecimals: 2
			            },
			            navigator: {
               				 enabled: false
            			},
            			scrollbar: {
                			enabled: false
            			},
            			rangeSelector: {
			                enabled: false
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

			           
						yAxis: [{
				            title: {

				            }
				        }, {
				            title: {

				            }
				        }],
						


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

			    $.each(names, function (i, name, type, json) 
			    {

			        if(name.name)
			        {
				        	console.log("existe");
				        $http.get($scope.json+name.name).success(function (data) 
				        {	



				            seriesOptions[i] = 
				            {
				                name: name.name,
				                data: data,
				                type: name.type,
				                yAxis: name.axi,
				                dataGrouping: {
				                    units: [[
				                        'hour', // unit name
				                        [1] // allowed multiples
				                    ]]
				                }
				            };

				            // As we're loading the data asynchronously, we don't know what order it will arrive. So
				            // we keep a counter and create the chart when all the data is loaded.
				            seriesCounter += 1;

				            if (seriesCounter === names.length) 
				            {
				                createChart();
				            }
				        });
				    } else {
				    	console
				  		 $http.get($scope.json+name).success(function (data) 
				        {	

				            seriesOptions[i] = 
				            {
				                name: name,
				                data: data,
				                type: $scope.type
				            };

				            // As we're loading the data asynchronously, we don't know what order it will arrive. So
				            // we keep a counter and create the chart when all the data is loaded.
				            seriesCounter += 1;

				            if (seriesCounter === names.length) 
				            {
				                createChart();
				            }
				        });
				    }
			    });
			};
			chart($scope.json, $scope.names, $scope.idiv, $scope.title, $scope.modal, $scope.type);
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
			
			$rootScope.loadingPage = false;
			return response;
		},
		responseError: function(rejection){
			
			$rootScope.loadingPage = false;
			return $q.rejection(rejection);
		}
		
	};
})
.directive("loading", function () {
	return {
		templateUrl : "/dash/components/templates/loading.html"
	}
})
.directive("alertd", function() {
	return {
		templateUrl : "/dash/components/templates/alertdanger.html",
		transclude : true
	}
})
.directive("alertw", function() {
	return {
		templateUrl : "/dash/components/templates/alertwarning.html",
		transclude : true
	}
})
.directive("alerti", function() {
	return {
		templateUrl : "/dash/components/templates/alertimpotant.html",
		transclude : true
	}
})
.directive("alerts", function() {
		return {
		templateUrl : "/dash/components/templates/alertsuccess.html",
		transclude : true
	}
})
