angular
  .module('games')
  .controller('BobController', function($scope, supersonic) {

    steroids.view.setBackgroundColor('#0c0c0c');

  	$scope.showSpinner = false;
  	$scope.score = 27;
  	$scope.scoreInput = undefined;
    $scope.double = 1;  
    $scope.doubleLabel = 1;	
  	$scope.numberOfDoublesHit = 0;
  	$scope.numberOfDartsThrown = 0;
  	$scope.turn = 0;

  	$scope.quitGame = function(){
      	var options = {
		  animate: true
		}
		
		supersonic.ui.modal.hide(options);
    };

    $scope.setScore = function(score){
    	  $scope.scoreInput = score; 
      	setPlayerScore();
    }

    function setPlayerScore(){
    	var hits = parseInt($scope.scoreInput);

    	var double = $scope.double;
    	if($scope.turn == 20) double = 25;

    	if(hits === 0){
    		$scope.score -= (2*double);
    	} else {
    		$scope.score += ((hits * double)*2);    		
    	}

    	$scope.double++;
    	$scope.doubleLabel++;
      if($scope.double >= 21){
        $scope.doubleLabel = 'Bull';
      }

    	$scope.turn++;
    	$scope.numberOfDartsThrown += 3;
    	$scope.numberOfDoublesHit += hits;

    	if($scope.turn == 21 || $scope.score <= 0){
    		if($scope.score <= 0) $scope.score = 0;
    		
    		endGame();
    	}
    };

    function endGame(){   	
    	var options = {
		  message: "Score: " + $scope.score + "\n" + "Number of darts thrown: " + $scope.numberOfDartsThrown + "\n"  + "Number of hits: " + $scope.numberOfDoublesHit,
		  buttonLabels: ["Quit"]
		};

		supersonic.ui.dialog.confirm("Good job!", options).then(function(index) {
		  	if (index == 0) {
		    	saveAndClose();
		  	} 
	  	});
    };

    function saveAndClose(){    	
    	$scope.showSpinner = true;  	
    	var object = {
			creation_datetime: new Date(),
			number_of_darts_thrown: $scope.numberOfDartsThrown,
			player_uuid: window.localStorage.getItem("guid"),
			score: $scope.score,
			number_of_doubles_hit: $scope.numberOfDoublesHit
		};
		
		var game = supersonic.data.model('BobAnderson');

		var bobGame = new game(object);

        bobGame.save().then( function () {
        	$scope.showSpinner = false;
        	$scope.quitGame();
        });
    };
  });
