var ejs = require("ejs");
var mysql = require('./mysql');

function insertUser(req,res)
{
	console.log("hi");
	req.session.name=req.param("username");
	var password = req.param("password");
	var preference = req.param("preference");
	
	console.log("session name:"+req.session.name);
	var insertUserQuery="insert into Users (Username, Password, Preference) values ('"+req.param("username")+"', '"+password+"', '"+preference+"')";
	console.log("Query is:"+insertUserQuery);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.render('index', { name: req.param("username") });
		}  
	},insertUserQuery);
}

function verify(req,res)
{
	console.log("hi");
	req.session.name=req.param("username");
	var password = req.param("password");
	
	console.log("session name:"+req.session.name);
	
	var verifyUserQuery="select username, password from Users where Username='"+req.param("username")+"' and Password = '"+req.param("password")+"'";
	console.log("Query is:"+verifyUserQuery);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.username==req.param("username") && results.password == password){
				res.render('kanban', { name: req.param("username") });}
			else {
				res.render('successInsert');
			}
		}  
	},verifyUserQuery);
}

function sprints(req,res) {

	//res.render('index2');
	ejs.renderFile('./views/sprints.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function getSprints(req,res)
{
	var getbacklogs="select count(*) as sno from scrum where projectname ='project1'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"sprintCount":JSON.stringify(results)});
		}
	},getbacklogs);
}

function getSprintdata(req,res)
{
	//console.log(req + " " + req.param("projectname"));
	var getbacklogs="select * from scrum where projectname ='project1'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"sprintdata":JSON.stringify(results)});
		}
	},getbacklogs);
}

function getStories(req,res)
{
	//console.log(req + " " + req.param("sprintselected"));
	var getbacklogs="select * from stories where sprint ='"+req.param("sprintselected")+"'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"stories":JSON.stringify(results)});
		}
	},getbacklogs);
}

function updateScrum(req,res)
{
	//console.log(req + " " + req.param("sprintselected"));
	var getbacklogs="update scrum set remaininghours = '"+req.param("Hours")+"', status= '"+req.param("Status")+"', velocity= '"+req.param("Velocity")+"', expectedenddate= '"+req.param("NewDate")+"' where sprint = '"+req.param("sprintselected")+"'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"updated":JSON.stringify(results)});
		}
	},getbacklogs);
}

function gotoCharts(req,res) {

	//res.render('index2');
	ejs.renderFile('./views/burndown.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function getCharts(req,res)
{
	//console.log(req + " " + req.param("sprintselected"));
	var getbacklogs="select startdate, idealenddate, expectedenddate, totalhours from scrum where sprint ='"+req.param("sprintselected")+"' and projectname='"+req.param("projectselected")+"'";
	console.log("Query is:"+getbacklogs);
	
	mysql.fetchData(function(err,results){
		if(err){
				res.end('An error occurred');;
			}
		else 
		{
			res.send({"chartdata":JSON.stringify(results)});
		}
	},getbacklogs);
}

exports.signin = function(req, res) {
	res.render('index'); 
	}
	

exports.verify=verify;

exports.insertUser=insertUser;
exports.sprints=sprints;
exports.getSprints=getSprints;
exports.getSprintdata=getSprintdata;
exports.getStories=getStories;
exports.updateScrum=updateScrum;
exports.gotoCharts=gotoCharts;
exports.getCharts=getCharts;




