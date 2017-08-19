
 routerApp.controller('resultCtrl',['$scope','$state', function($scope,$state) {
   $scope.count=localStorage.getItem("count");
    localStorage.clear();
      $scope.retake=function(){
	     $state.go("userpage");
       }
 }]);