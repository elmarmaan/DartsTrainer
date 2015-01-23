angular
  .module('player')
  .controller("EditController", function ($scope, Player, supersonic) {
    $scope.player = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Player.find(steroids.view.params.id).then( function (player) {
      $scope.$apply(function() {
        $scope.player = player;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.player.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
