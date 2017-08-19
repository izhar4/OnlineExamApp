var express=require('express');
var app=express();
var path=require('path');
var mongoose=require('mongoose');
var router=require('./routes/router');
var bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',router);

app.listen(8081,function(){
  console.log("server listening at 8081");
})

app.use(express.static(path.join(__dirname,'/public')));






