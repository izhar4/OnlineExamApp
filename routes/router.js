var express=require('express');
var Controller=require('./../controllers/controller');
var router=express.Router();
router.route('/').post(Controller.saveUsers);
router.route('/login').get(Controller.loginPage);
router.route('/validateUser').get(Controller.userValidate);
router.route('/userPage').get(Controller.userPage);
router.route('/adminPage').get(Controller.adminPage);
router.route('/saveQuestions').post(Controller.saveQuestions);
router.route('/loadQuestions').get(Controller.loadQuestions);
router.route('/deleteQuestions').delete(Controller.deleteQuestions);
router.route('/updateQuestions').put(Controller.updateQuestions);

router.route('/registration').get(Controller.registration);
module.exports=router;