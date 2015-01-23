angular
  .module('games')
  .controller('BobController', function($scope, supersonic) {
  	$scope.showSpinner = false;
  	$scope.score = 27;
  	$scope.scoreInput = undefined;
  	$scope.scores = [
  		{name: '1', value: 0, done: false},
  		{name: '2', value: 0, done: false},
  		{name: '3', value: 0, done: false},
  		{name: '4', value: 0, done: false},
  		{name: '5', value: 0, done: false},
  		{name: '6', value: 0, done: false},
  		{name: '7', value: 0, done: false},
  		{name: '8', value: 0, done: false},
  		{name: '9', value: 0, done: false},
  		{name: '10', value: 0, done: false},
  		{name: '11', value: 0, done: false},
  		{name: '12', value: 0, done: false},
  		{name: '13', value: 0, done: false},
  		{name: '14', value: 0, done: false},
  		{name: '15', value: 0, done: false},
  		{name: '16', value: 0, done: false},
  		{name: '17', value: 0, done: false},
  		{name: '18', value: 0, done: false},
  		{name: '19', value: 0, done: false},
  		{name: '20', value: 0, done: false},
  		{name: 'Bull', value: 0, done: false}
  	];
  	$scope.numberOfDoublesHit = 0;
  	$scope.numberOfDartsThrown = 0;
  	$scope.turn = 0;

  	$scope.quitGame = function(){
      	var options = {
		  animate: true
		}
		
		supersonic.ui.modal.hide(options);
    };

    $scope.setScore = function(){
    	if(isNaN($scope.scoreInput) || $scope.scoreInput === '' || $scope.scoreInput > 3 || $scope.scoreInput < 0){
            supersonic.ui.dialog.alert('Please provide a valid number!');
            return;
      	}
      	setPlayerScore();
    }

    function setPlayerScore(){
    	var hits = parseInt($scope.scoreInput);

    	var double = parseInt($scope.scores[$scope.turn].name)
    	if($scope.turn == 20) double = 25;

    	if(hits === 0){
    		$scope.score -= (2*double);
    	} else {
    		$scope.score += ((hits * double)*2);    		
    	}

    	$scope.scores[$scope.turn].done = true;
    	$scope.scores[$scope.turn].value = hits;
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
