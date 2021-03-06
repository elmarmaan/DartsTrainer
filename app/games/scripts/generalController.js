angular
  .module('games')
  .controller('GeneralController', function($scope, supersonic) {
  	$scope.name = window.localStorage.getItem("name");
    $scope.score = steroids.view.params.score;
    $scope.cpuAverage = parseInt(steroids.view.params.cpuAverage);
    $scope.playerScore = steroids.view.params.score;
    $scope.cpuScore = steroids.view.params.score;
    $scope.scoreInput = undefined;
    $scope.numberOfDartsThrown = 0;
    $scope.numberOfCpuAttemptsToFinish = Math.floor(Math.random() * 5) + 1;
    $scope.numberOfCpuAttemptsToFinishMade = 0;
    $scope.oneHundred = 0;
    $scope.oneHundredFourty = 0;
    $scope.oneHundredEighty = 0;


    $scope.playerScores = new Array();
    $scope.cpuScores = new Array();

    $scope.setScore = function(){  
    	if(isNaN($scope.scoreInput) || $scope.scoreInput === ''){
            supersonic.ui.dialog.alert('Please provide a valid number!');
            return;
      	}
    	setPlayerScore();
	    	if($scope.playerScore <= 0){
	    		var options = {
		        title: "",
		        buttonLabels: ["OK"],
		        defaultText: "3"
		      };

		      supersonic.ui.dialog.prompt("How many darts did you use to finish?", options).then(function(result) {
		        if(result.buttonIndex === 0){
		          if(isNaN(result.input) || result.input === '' || result.input > 3 || result.input < 0){
		            supersonic.ui.dialog.alert('Please provide a valid number!');
		          } else{
		          	$scope.numberOfDartsThrown += parseInt(result.input);
		            playerWon();
		          }          
		        }        
		      });			
			return;
    	} else{
    		$scope.numberOfDartsThrown += 3;
    	}

		setCpuScore();
		if($scope.cpuScore <= 0){
			cpuWon();
		}
    }

    $scope.quitGame = function(){
      	var options = {
		  animate: true
		}
		
		supersonic.ui.modal.hide(options);
    };

    function getRandomNumber(min,max){
    	if(min <= 0) min = 1;
    	return Math.floor(Math.random() * ((max-min)+1) + min);
	}

	function setPlayerScore(){	
		var playerScore = parseInt($scope.scoreInput);
		if($scope.playerScore - playerScore < 0) supersonic.ui.dialog.alert('Please fill in a valid score!');
		 else $scope.playerScore -= playerScore;
    	
    	$scope.playerScores[$scope.playerScores.length] = playerScore;

    	if(playerScore >= 100){
    		$scope.oneHundred++;
    	}
    	if(playerScore >= 140){
    		$scope.oneHundredFourty++;
    	}
    	if(playerScore == 180){
    		$scope.oneHundredEighty++;
    	}
	}
	function playerWon(){
		endGame('You won!')
		saveGame(true);
	}

	function setCpuScore(){
		var cpuScore = getRandomNumber($scope.cpuAverage-25, $scope.cpuAverage+25);

		if($scope.cpuScore - cpuScore <= 2){
			if($scope.numberOfCpuAttemptsToFinish !== $scope.numberOfCpuAttemptsToFinishMade){
				cpuScore = getRandomNumber(2, $scope.cpuScore-2);
			}

			$scope.numberOfCpuAttemptsToFinishMade++;
		}

		if($scope.cpuScore - cpuScore <= 1){
			$scope.cpuScore = 0;
		} else{
			$scope.cpuScore -= cpuScore;
		}			
					
		$scope.cpuScores[$scope.cpuScores.length] = cpuScore;		
	};

	function cpuWon(){
		endGame('You lose!');
		saveGame(false);
	}

	function endGame(text){
		var options = {
		  message: "Number of darts thrown: " + $scope.numberOfDartsThrown + "\n\r"  + "Three darts average: " + calculateThreeDartsAverage($scope.playerScores, $scope.numberOfDartsThrown),
		  buttonLabels: ["Quit"]
		};

		supersonic.ui.dialog.confirm(text, options).then(function(index) {
		  if (index == 0) {
		    var options = {
			  animate: true
			}
			
			supersonic.ui.modal.hide(options);
		  } 
		});
	}

	function calculateThreeDartsAverage(scores, numberOfDartsThrown){
		var total = 0;
		for (var i = scores.length - 1; i >= 0; i--) {
			total += scores[i];
		};

		return Number(((total/numberOfDartsThrown) *3).toFixed(1));
	}

	function saveGame(won){
		var object = {
			cpu_average: $scope.cpuAverage,
			creation_datetime: new Date(),
			number_of_darts_thrown: $scope.numberOfDartsThrown,
			player_average: calculateThreeDartsAverage($scope.playerScores, $scope.numberOfDartsThrown),
			player_uuid: window.localStorage.getItem("guid"),
			score_from: $scope.score,
			won: won,
			finish: won ? $scope.scoreInput : 0,
			one_hundred_plus: $scope.oneHundred,
			one_hundred_fourty_plus: $scope.oneHundredFourty,
			one_hundred_eighty_plus: $scope.oneHundredEighty
		};
		
		var game = supersonic.data.model('GeneralGame');

		var newgeneralgame = new game(object);
        newgeneralgame.save().then( function () {
          //supersonic.ui.modal.hide();
        });
	}

  });
