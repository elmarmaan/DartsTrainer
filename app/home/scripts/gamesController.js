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
