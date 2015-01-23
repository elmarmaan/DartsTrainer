angular
  .module('player')
  .controller("IndexController", function ($scope, Player, supersonic) {
    $scope.players = null;
    $scope.showSpinner = true;
    $scope.guid = window.localStorage.getItem("guid");

    var query = { "player_uuid": window.localStorage.getItem("guid")};

    Player.findAll({query: JSON.stringify(query)}).then( function (players) {
        $scope.$apply( function () {
          $scope.players = players;
          $scope.showSpinner = false;
        });
    });

    Player.all().whenChanged( function (players) {
        $scope.$apply( function () {
          $scope.players = players;
          $scope.showSpinner = false;
        });
    });
});