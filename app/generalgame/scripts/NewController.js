angular
  .module('generalgame')
  .controller("NewController", function ($scope, Generalgame, supersonic) {
    $scope.generalgame = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;

      newgeneralgame = new Generalgame($scope.generalgame);

      supersonic.ui.dialog.alert('object: ' + JSON.stringify(newgeneralgame));

      newgeneralgame.save().then( function () {
        //supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });