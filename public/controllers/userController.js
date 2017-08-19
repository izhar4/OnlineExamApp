routerApp.controller('userCtrl',['$scope','$http','$state', function($scope,$http,$state) {
 $scope.arr=[];
$scope.current=0;
$scope.questionsList=[];
$scope.counter=0;
var previous=0;
  function display(){
	  $http.get("/loadQuestions")
	     .then(function (response) {
                  $scope.questionsList=response.data;
                   $scope.size=$scope.questionsList.length;
                },
               function myError(response) {
               }
            );
    }

   $scope.startTest=function(){
	  $scope.a=true;
	  display();
    }

   $scope.next=function(){
	  marks();
      $scope.user.option="";
      $scope.current++;
    }
 
   $scope.prev=function(){
	$scope.check={};
	 $scope.current--;
	 if($scope.questionsList[$scope.current].type=="single choice"){
	 	
	 	var answer=$scope.questionsList[$scope.current].answer;

		  if(answer==$scope.arr[$scope.current]){
		  
             $scope.counter--;
             
		    }
	 	$scope.user.option=$scope.arr[$scope.current];
	 $scope.arr.pop($scope.current);
	 }
	 else if($scope.questionsList[$scope.current].type=="multi choice"){
	 	var str=$scope.questionsList[$scope.current].answer;
		  var arr=str.split(",");
		  var answer1=arr[0];
		  var answer2=arr[1];
		  var a=[];
		 a=$scope.arr[$scope.current];
             var option1=a[0];
		  var option2=a[1];
		  if(((answer1==option1)||(answer1==option2))&&((answer2==option1)||(answer2==option2))){
             $scope.counter--;
             
		    }


	 	$scope.checkArr=[];
	 	
	 	$scope.checkArr=$scope.arr[$scope.current];
        
            var check1=$scope.checkArr[0];
            var check2=$scope.checkArr[1];
             $scope.check[check1]=true;
             $scope.check[check2]=true;
             $scope.arr.pop($scope.current);


	 	}
    }


   function marks(){
	  if($scope.questionsList[$scope.current].type=="single choice"){
	  	$scope.arr.push($scope.user.option);
	     var answer=$scope.questionsList[$scope.current].answer;
		  if(answer==$scope.user.option){
             $scope.counter++;
		    }

	   }
	  else if($scope.questionsList[$scope.current].type=="multi choice"){
 
		  var str=$scope.questionsList[$scope.current].answer;
		  var arr=str.split(",");
		  var answer1=arr[0];
		  var answer2=arr[1];
		  var a=[];
		  for(var i in $scope.check){
			 a.push(i);
		    }
           
           $scope.arr.push(a);

		  var option1=a[0];
		  var option2=a[1];
		  if(((answer1==option1)||(answer1==option2))&&((answer2==option1)||(answer2==option2))){
             $scope.counter++;
		    }
		      $scope.check={};
        }
    }

   $scope.submit=function(){
  	 marks();
  	 
  	 localStorage.setItem("count",$scope.counter);
  	  $state.go("resultpage");
  	}

}]);