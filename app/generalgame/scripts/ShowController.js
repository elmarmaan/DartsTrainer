angular
  .module('generalgame')
  .controller("ShowController", function ($scope, Generalgame, supersonic) {
    $scope.generalgame = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Generalgame.find($scope.dataId).then( function (generalgame) {
        $scope.$apply( function () {
          $scope.generalgame = generalgame;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.generalgame.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });