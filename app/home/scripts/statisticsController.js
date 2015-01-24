angular
  .module('home')
  .controller('StatisticsController', function($scope, supersonic) {
    
    steroids.view.setBackgroundColor('#0c0c0c');

    $scope.showGeneralStatistics = function(provider){
    	var view = new supersonic.ui.View("statistic#general");
        var options = {
          animate: true,
          params: {
            score: provider,
          }
        }

        supersonic.ui.layers.push(view, options);
    }

    $scope.showBobStatistics = function(){
      var view = new supersonic.ui.View("statistic#bob");
        var options = {
          animate: true          
        }

        supersonic.ui.layers.push(view, options);
    }
  });
