angular
  .module('player')
  .controller("NewController", function ($scope, Player, supersonic) {
    $scope.player = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      $scope.player.player_uuid = window.localStorage.getItem("guid");
      newplayer = new Player($scope.player);
      newplayer.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

    

  });