
routerApp.controller('formCtrl',['$scope','$http','$state', function($scope,$http,$state) {
  $scope.role=["user","admin"];
   $scope.submit=function(){
   	if($scope.user.role==undefined)
   	{
$scope.message="please select role";
   	}
   	else{
     $http.post("/",$scope.user)
       .then(function(response) {
              if(response.statusText=="OK"){
        	      $state.go("login");
                }
            },
            function(response){
                $scope.message=response.statusText;
            }
        );
    }
  }
}]);