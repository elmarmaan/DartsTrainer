angular.module('generalgame', [
  /* Declare any module-specific dependencies here */
  'common'
]);
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

angular
  .module('generalgame')
  .constant('Generalgame', supersonic.data.model('GeneralGame'));
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