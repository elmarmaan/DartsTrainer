angular
  .module('statistic')
  .controller('BobController', function($scope, supersonic) {
    $scope.showSpinner = true;
    $scope.games = new Array();
    $scope.status = 'beginner';
    $scope.bestScore = 0;
    $scope.mostNumberOfDartsThrown = 0;
    $scope.lessNumberOfDartsThrown = 0;
    $scope.worstScore = 0;
    $scope.threeDartAverage = 0;
    $scope.scoreAverage = 0;
    $scope.hittingPercentage = 0;

    var bobGame = supersonic.data.model('BobAnderson');

    var query = { 
      "player_uuid": window.localStorage.getItem("guid")
    };

    bobGame.findAll({query: JSON.stringify(query)}).then( function (games) {
        $scope.$apply( function () {
          $scope.games = games;
          $scope.showSpinner = false;
          setScopeVariables(games);
        });
    });

    function setScopeVariables(games){
      $scope.lessNumberOfDartsThrown = games.sort(function(a, b){
        return a.number_of_darts_thrown - b.number_of_darts_thrown})[0].number_of_darts_thrown;
      $scope.mostNumberOfDartsThrown = games.sort(function(a, b){
        return b.number_of_darts_thrown - a.number_of_darts_thrown})[0].number_of_darts_thrown;

      $scope.worstScore = games.sort(function(a, b){
        return a.score - b.score})[0].score;
      $scope.bestScore = games.sort(function(a, b){
        return b.score - a.score})[0].score;

      var totalScore = 0;
      var totalHits = 0;
      var totalNumberOfDartsThrown = 0;
      for (var i = games.length - 1; i >= 0; i--) {
        totalScore += games[i].score;
        totalHits += games[i].number_of_doubles_hit;
        totalNumberOfDartsThrown += games[i].number_of_darts_thrown
      };

      $scope.threeDartAverage = totalHits / (totalNumberOfDartsThrown/3);
      $scope.scoreAverage = totalScore / games.length;
      $scope.hittingPercentage = totalHits/totalNumberOfDartsThrown * 100;

      if($scope.scoreAverage < 10){
        $scope.status = 'Beginner';
      } else if($scope.scoreAverage >= 10 && $scope.scoreAverage < 100){
        $scope.status = 'Mediate';
      } else if($scope.scoreAverage >= 100 && $scope.scoreAverage < 500){
        $scope.status = 'semi-pro';
      } else if($scope.scoreAverage >= 500 && $scope.scoreAverage < 800){
        $scope.status = 'Pro';
      } else if($scope.scoreAverage >= 800){
        $scope.status = 'Expert';
      } 

    }
});
