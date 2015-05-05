
/*
 * GET home page.
 */
var ejs = require("ejs");
var mysql = require('./mysql');


exports.index = function(req, res){
  res.render('index');
};

exports.kanban = function(req, res){
	req.session.name=req.param("username");
	  res.render('kanbannew', {name: req.param("username")});
	};

function insertUser(req,res)
{
	console.log("hi");
	req.session.name=req.param("username");
	var password = req.param("password");
	var preference = req.param("preference");
	
	console.log("session name:"+req.session.name);
	var insertUserQuery="insert into TENANT (Username, Password1, Preference) values ('"+req.param("username")+"', '"+password+"', '"+preference+"')";
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

 exports.verify = function (req,res)
{
	req.session.name=req.param("username");
	var password1 = req.param("password");
	
	console.log("session name:"+req.session.name);
	
	var verifyUserQuery="select username, password1, preference from TENANT where Username='"+req.param("username")+"' and Password1 = '"+req.param("password")+"'";
	console.log("Query is:"+verifyUserQuery);
	
	//res.render('kanbannew', { name: req.param("username")});
	
	mysql.fetchData(function(err,tables, results){
		if(err){
			res.render('index');
		}
		else 
		{
			if(tables.length>0){
				var username = tables[0].username;
				var password = tables[0].password1;
				
				if(username==req.param("username") && password == password1)
				{
					if(tables[0].preference == "kanban")
						{
						var RTSQuery="SELECT Max(CASE WHEN TME.EXTENSION_ID = '555' THEN EXT.value END) RTS_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '556' THEN EXT.value END) RTS_DESC, Max(CASE WHEN TME.EXTENSION_ID = '559' THEN EXT.value END) RFR_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '560' THEN EXT.value END) RFR_DESC, Max(CASE WHEN TME.EXTENSION_ID = '557' THEN EXT.value END) IP_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '558' THEN EXT.value END) IP_DESC, Max(CASE WHEN TME.EXTENSION_ID = '561' THEN EXT.value END) RF_TITLE, Max(CASE WHEN TME.EXTENSION_ID = '562' THEN EXT.value END) RF_DESC FROM TENANTDATAEXTENSION EXT, TENANTMETADATAEXTENSION TME WHERE TME.EXTENSION_ID = EXT.EXTENSION_ID";
						console.log("Query is:"+RTSQuery);
						mysql.fetchData(function(err, tables, results){
							console.log (tables);
							if ( !err ) { 
								res.render('kanbannew', {
									"tablelist" : tables, name: username						
								 });
								
							} else {
							   res.send("error occurred " + err.message);
							}	
						},RTSQuery);
						}
					else if(tables[0].preference == "scrum")
						res.render('scrum', { name: username});
					else if(tables[0].preference == "waterfall")
						res.render('waterfall', { name: username});
					}
				else {
					res.render('index');
				}
			}
			
		}  
	},verifyUserQuery); 
}

 exports.addCard = function (req,res)
 {
	 res.render('index'); 
 }
 
exports.signin = function(req, res) {
	res.render('kanbannew'); 
	}
	

//exports.signin=verifySignin;

exports.insertUser=insertUser;




