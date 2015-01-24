angular.module('home', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);

angular
  .module('home')
  .controller('IndexController', function($scope, supersonic) {

    steroids.view.setBackgroundColor('#0c0c0c');

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

angular
  .module('home')
  .controller('DrawerController', function($scope, supersonic) {
    $scope.signOut = function(){
        window.localStorage.setItem("guid", '');
        window.localStorage.setItem("name", '');
        var view = new supersonic.ui.View("home#login");
        supersonic.ui.modal.show(view, {animate: true});  
    }
  });

angular
  .module('home')
  .controller('GamesController', function($scope, supersonic) {
    $scope.startGeneralGame = function(provider){
      var options = {
        title: "",
        buttonLabels: ["Start", "Cancel"],
        defaultText: "60"
      };

      supersonic.ui.dialog.prompt("What will be the average of the opponent?", options).then(function(result) {
        if(result.buttonIndex === 0){
          if(isNaN(result.input) || result.input === ''){
            supersonic.ui.dialog.alert('Please provide a valid number!');
          } else{
            var modalView = new supersonic.ui.View("games#general");
            var options = {
              animate: true,
              params: {
                score: provider,
                cpuAverage: result.input
              }
            }

            supersonic.ui.modal.show(modalView, options);
          }          
        }        
      });
    }

    $scope.startBobAnderson = function(){
      var modalView = new supersonic.ui.View("games#bob");
      var options = {
        animate: true        
      }

      supersonic.ui.modal.show(modalView, options);
    }
  });

angular
  .module('home')
  .controller('LoginController', function($scope, supersonic) {
    // Controller functionality here
    $scope.username = undefined;
    $scope.password = undefined;
    $scope.player = undefined;

    $scope.login = function(){
      if(validatePlayer()){
          var Player = supersonic.data.model('Player');
          var query = { "username": $scope.username};

          Player.findAll({query: JSON.stringify(query)}).then( function (players) {
              $scope.$apply( function () {
                if(players.length === 1 && players[0].password === $scope.password){
                  //successfull login
                  window.localStorage.setItem("guid", players[0].player_uuid);
                  window.localStorage.setItem("name", players[0].name);
                  supersonic.ui.modal.hide({animate: true});
                } else{
                  supersonic.ui.dialog.alert('Login failed!');
                }
              });
          });
      }
    };

    function validatePlayer(){
      if(!$scope.username || $scope.username === ''){
        supersonic.ui.dialog.alert('Please fill in an email address!');
        return false;
      } else if(!$scope.password || $scope.password === ''){
        supersonic.ui.dialog.alert('Please fill in a password!');
        return false;
      }     
      return true;
    }
  });

angular
  .module('home')
  .controller('RegisterController', function($scope, supersonic) {
    // Controller functionality here
    $scope.name = undefined;
    $scope.username = undefined;
    $scope.password = undefined;

    $scope.register = function(){
    	if(validatePlayer()){
    		var uuid = guid();

    		var object = {
				name: $scope.name,
				username: $scope.username,
				password: $scope.password,
				player_uuid: uuid
			};
			var Player = supersonic.data.model('Player');
			var newPlayer = new Player(object);
	        newPlayer.save().then( function () {
	        	window.localStorage.setItem("guid", guid);
	        	window.localStorage.setItem("name", $scope.name);
	        	supersonic.ui.modal.hide({animate: true});
	        });
    	}    	
    };

    $scope.login = function(){
    	var view = new supersonic.ui.View("home#login");
      	supersonic.ui.layers.push(view);
    };

    function validatePlayer(){
    	if(!$scope.name || $scope.name === ''){
    		supersonic.ui.dialog.alert('Please fill in a name!');
    		return false;
    	} else if(!$scope.username || $scope.username === ''){
    		supersonic.ui.dialog.alert('Please fill in an email address!');
    		return false;
    	} else if(!$scope.password || $scope.password === ''){
    		supersonic.ui.dialog.alert('Please fill in a password!');
    		return false;
    	}    	
    	return true;
    }
    
    function S4() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
    }

    function guid() {
      return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }
  });

angular
  .module('home')
  .controller('StatisticsController', function($scope, supersonic) {
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
