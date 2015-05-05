var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , session = require('express-session')
  , path = require('path')
  , home = require('./routes/home')
  , mysql = require('mysql');

var app = express();
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat'}));
// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

 var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
 var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/index', routes.index);

app.post('/insertUser', routes.insertUser);

app.post('/addCard', routes.addCard);
app.get('/addCard', routes.addCard);

//app.get('/signin', home.signin);
app.get('/signin', routes.signin);
app.post('/signin', routes.verify);

app.get('/kanbannew', routes.kanban);
app.get('/sprints', home.sprints);
app.get('/getSprints', home.getSprints);
app.get('/getSprintdata', home.getSprintdata);
app.post('/stories', home.getStories);
app.post('/updatescrum', home.updateScrum);
app.get('/burndown', home.gotoCharts);
app.post('/getChartdata', home.getCharts);

/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/


 http.createServer(app).listen(server_port, server_ip_address, function(){
  console.log('Express server listening on server' +server_ip_address+ ' and port ' + server_port);
});
 
