angular
  .module('statistic')
  .controller('GeneralController', function($scope, supersonic) {
    $scope.score = steroids.view.params.score;
  	$scope.games = null
  	$scope.showSpinner = true;
  	//totals
  	$scope.lessNumberOfDartsThrown = 0;
  	$scope.mostNumberOfDartsThrown = 0;
  	$scope.bestThreeDartAverage = 0;
  	$scope.worstThreeDartAverage = 0;
  	$scope.numberOfGamesWon = 0;
  	$scope.numberOfGamesLost = 0;
    $scope.highestFinish = 0;
    $scope.oneHundred = 0;
    $scope.oneHundredFourty = 0;
    $scope.oneHundredEighty = 0;
    $scope.status = 'Beginner';

  	//averages
  	$scope.threeDartAverage = 0;
  	$scope.numberOfDartsThrownAverage = 0;

  	var GeneralGame = supersonic.data.model('GeneralGame');

  	var query = { 
  		"player_uuid": window.localStorage.getItem("guid"),
  		"score_from": $scope.score
    };

    GeneralGame.findAll({query: JSON.stringify(query)}).then( function (games) {
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

    	$scope.bestThreeDartAverage = games.sort(function(a, b){
    		return b.player_average - a.player_average})[0].player_average;
    	$scope.worstThreeDartAverage = games.sort(function(a, b){
    		return a.player_average - b.player_average})[0].player_average;

      $scope.highestFinish = games.sort(function(a, b){
        return b.finish - a.finish})[0].finish;

    	var totalNumberOfDartsThrown = 0;
    	var totalThreeDartsAverage = 0;      

    	for (var i = games.length - 1; i >= 0; i--) {
    		if(games[i].won){
    			$scope.numberOfGamesWon++;
    		} else{
				$scope.numberOfGamesLost++;
    		}

    		totalNumberOfDartsThrown += games[i].number_of_darts_thrown;
    		totalThreeDartsAverage += games[i].player_average;
        $scope.oneHundred += games[i].one_hundred_plus;
        $scope.oneHundredFourty += games[i].one_hundred_fourty_plus;
        $scope.oneHundredEighty += games[i].one_hundred_eighty_plus;
    	};

    	$scope.threeDartAverage = totalThreeDartsAverage/games.length;
    	$scope.numberOfDartsThrownAverage = totalNumberOfDartsThrown/games.length;
      if($scope.threeDartAverage < 40){
        $scope.status = 'Beginner';
      }else if($scope.threeDartAverage >= 40 && $scope.threeDartAverage < 60){
        $scope.status = 'Average'
      } else if($scope.threeDartAverage >= 60 && $scope.threeDartAverage < 85){
        $scope.status = 'Semi pro'
      } else if($scope.threeDartAverage >= 85 && $scope.threeDartAverage < 100){
        $scope.status = 'Pro'
      } else if($scope.threeDartAverage >= 100){
        $scope.status = 'Expert'
      } 
    }
});
