routerApp.controller('adminCtrl',['$scope','$http', function($scope,$http) {
	display();
   $scope.type=["single choice","multi choice"];
 
  function Question(question,type,options,answer){
     this.question=question;
     this.type=type;
     this.options=options;
     this.answer=answer;
   }

   var questionData={
      questionsList:[],
       addQuestion:function(ques,type,options,answer){
         var questionDesc = new Question(ques,type,options,answer);
         this.questionsList.push(questionDesc);
        }
    }

   function display(){
	  $http.get("/loadQuestions").then(function (response) {
        $scope.dataList = response.data;
        },function myError(response) {
              $scope.message = response.data;
           });
    }

    function clearView()
    {

    	          $scope.question.name="";
	              $scope.question.type="";
	              $scope.question.option1="";
	              $scope.question.option2="";
	              $scope.question.option3="";
	              $scope.question.option4="";
	              $scope.question.answer="";
	              $scope.message="";
    }
    

$scope.updateButtonBoolean=false;

    $scope.dataList=[];
	function validateQuestion(){
	  if($scope.question.name==''||$scope.question.type==''||$scope.question.option1==''||$scope.question.option2==''||$scope.question.option3==''||$scope.question.option4==''||$scope.question.answer==''){
		$scope.message="Enter complete data";
		return false;
	   }
	  else{
	      var a=$scope.question.answer
	      var x=a.split(",");
	        if(x.length==1){
              if(x[0]==$scope.question.option1||x[0]==$scope.question.option2||x[0]==$scope.question.option3||x[0]==$scope.question.option4){
                  
                  
	              
	              return true;
                }
               else{
        	      $scope.message="answer not matching with options";
        	      return false;
                }
            }
	       else if(x.length==2){
		      if((x[0]==$scope.question.option1||x[0]==$scope.question.option2||x[0]==$scope.question.option3||x[0]==$scope.question.option4)&&(x[1]==$scope.question.option1||x[1]==$scope.question.option2||x[1]==$scope.question.option3||x[1]==$scope.question.option4)){
		          
	              
	              return true;	
		        }
		      else{
			     $scope.message="answer not matching with options";
			     return false;
		        }
	        }
	    }          
	}


	$scope.saveQuestion=function(){
		var boolean=validateQuestion();
		if(boolean==true){
			questionData.addQuestion($scope.question.name,$scope.question.type,[$scope.question.option1,$scope.question.option2,$scope.question.option3,$scope.question.option4],$scope.question.answer);
           clearView();
           $scope.Questions=[];
             $scope.Questions=questionData.questionsList;
           if($scope.Questions.length>0){
      	       $scope.message="";
               $http.post("/saveQuestions",$scope.Questions)
                    .then(function(response) {
                       display();//  $scope.dataList=response.data;
                    },
                   function(response){
                       $scope.message=response.statusText;
                    }
               );
              questionData.questionsList=[];
            }
            else
              {
        	   $scope.message="please add questions";
            }
        }
    }


    $scope.removeQuestion=function(id){
    	$http.delete("/deleteQuestions",{params:{id:id}})
         .then(
             function(response){
       	         display();
       	        }, 
             function(response){
                 $scope.message=response.statusText;
                }
            );
    }
 

     var updateId=0;
    $scope.editQuestion=function(i){
    	$scope.updateButtonBoolean=true;
           $scope.question.name=$scope.dataList[i].question;
           $scope.question.type=$scope.dataList[i].type;
            $scope.question.option1=$scope.dataList[i].options[0];
            $scope.question.option2=$scope.dataList[i].options[1];
            $scope.question.option3=$scope.dataList[i].options[2];
            $scope.question.option4=$scope.dataList[i].options[3];
            $scope.question.answer=$scope.dataList[i].answer;
            updateId=$scope.dataList[i].id;
    }


   $scope.updateQuestion=function(){
   	 var boolean=validateQuestion();
   	 if(boolean){
   		  $scope.updateButtonBoolean=false;
   	      $scope.obj={question:$scope.question.name,type:$scope.question.type,options:[$scope.question.option1,$scope.question.option2,$scope.question.option3,$scope.question.option4],answer:$scope.question.answer,id:updateId}
           $http.put("/updateQuestions",$scope.obj)
            .then(function(response) {
                    var question=response.data;
                    var i=question.id;
                   $scope.dataList[i-1].question=question.question;
                   $scope.dataList[i-1].type=question.type;
                   $scope.dataList[i-1].options=question.options;
                   $scope.dataList[i-1].answer=question.answer;
                   $scope.dataList[i-1].id=question.id;
                   clearView();
                },
               function(response){
                   $scope.message=response.statusText;
                }
           );
        }
   }


   $scope.cancelQuestion=function(){
   	$scope.updateButtonBoolean=false;
                 clearView();
   }
	
}]);