angular
  .module('generalgame')
  .controller("EditController", function ($scope, Generalgame, supersonic) {
    $scope.generalgame = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Generalgame.find(steroids.view.params.id).then( function (generalgame) {
      $scope.$apply(function() {
        $scope.generalgame = generalgame;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.generalgame.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
