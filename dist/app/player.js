angular.module('player', [
  /* Declare any module-specific dependencies here */
  'common'
]);
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
angular
  .module('player')
  .constant('Player', supersonic.data.model('Player'));
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