var app = angular.module('dashboard', ['ui.router', 'navbar', 'fca']);

app.controller('dash', function($scope, $http, $mdDialog) {

	$scope.falhas = [{"falha":"Falha no ECE", "dataHora":"25/25/2025 15:10"},
					 {"falha":"Falha no CCE", "dataHora":"25/25/2025 15:10"}];

	$scope.sendEmail = function () {
		console.log($scope.falhas);
        var formData = { "title": $scope.falhas[0].falha, "menssage" : $scope.falhas[0].dataHora };
        var postData = 'myData='+JSON.stringify(formData);
        $http({
                method : 'POST',
                url : 'sendEmail.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

        }).success(function(res){
                console.log(res);
        }).error(function(error){
                console.log(error);
    	});
	};
  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
  $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/dashboard/components/emailFalha.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };


  $scope.showPrerenderedDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
