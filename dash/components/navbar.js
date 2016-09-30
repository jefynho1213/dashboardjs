angular.module("navbar", []);
angular.module("navbar").directive("navbar", function () {
	return  {
		templateUrl : "components/templates/navbar.html",
		scope : {
			title : '@', 
			buttons : '='
		}
	}
});
