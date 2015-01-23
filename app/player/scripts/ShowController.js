angular
  .module('player')
  .controller("ShowController", function ($scope, Player, supersonic) {
    $scope.player = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Player.find($scope.dataId).then( function (player) {
        $scope.$apply( function () {
          $scope.player = player;
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
      $scope.player.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });