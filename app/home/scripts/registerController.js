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
