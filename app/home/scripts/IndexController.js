angular
  .module('home')
  .controller('IndexController', function($scope, supersonic) {
    var options = {
      side: "left"
    }
    supersonic.ui.drawers.init("home#drawer", options);

    var currentGuid = window.localStorage.getItem("guid");

    if(!currentGuid || currentGuid === ''){
      var view = new supersonic.ui.View("home#register");
      supersonic.ui.modal.show(view, {animate: true});      
    }

    $scope.startNewGame = function(){
      var view = new supersonic.ui.View("home#games");
      supersonic.ui.layers.push(view);
    }

    $scope.showStatistics = function(){
      var view = new supersonic.ui.View("home#statistics");
      supersonic.ui.layers.push(view);
    }

    $scope.showDrawer = function(){
      supersonic.ui.drawers.open("left");
    };

    $scope.showHelp = function(){
      var view = new supersonic.ui.View("help#index");
      supersonic.ui.layers.push(view);
    };
  });
