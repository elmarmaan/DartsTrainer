angular
  .module('home')
  .controller('LoginController', function($scope, supersonic) {
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
