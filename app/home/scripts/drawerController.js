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
