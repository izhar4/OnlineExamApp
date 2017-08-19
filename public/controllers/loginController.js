routerApp.controller('loginCtrl',['$scope','$http','$state', function($scope,$http,$state) {
  $scope.submit=function(){
	  
          $http.get("/validateUser",{params:{name:$scope.user.name,password:$scope.user.password}})
             .then(function (response) {
                      if(response.data=="user"&&response.status==200){
       	                   $state.go("userpage");
                        }
                      else if(response.data=="admin"&&response.status==200){
       	                  $state.go("adminpage");
                        }
                    },
                   function myError(response) {
                       $scope.message = response.data;
                    }
                );
        
      
    }
}]);
