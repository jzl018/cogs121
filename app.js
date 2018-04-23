// module dependencies
const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express-handlebars');

//routes
const login = require('./routes/login');
const home = require('./routes/home');
const nextEvent = require('./routes/nextEvent');
const agenda = require('./routes/agenda');
//const temp = require('.routes/temp');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', login.view);
app.get('/home', home.view);
app.get('/nextEvent', nextEvent.view);
app.get('/agenda', agenda.view);
//app.get('/temp', temp.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
