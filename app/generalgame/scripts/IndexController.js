angular
  .module('generalgame')
  .controller("IndexController", function ($scope, Generalgame, supersonic) {
    $scope.generalgames = null;
    $scope.showSpinner = true;

    Generalgame.all().whenChanged( function (generalgames) {
        $scope.$apply( function () {
          $scope.generalgames = generalgames;
          $scope.showSpinner = false;
        });
    });
  });