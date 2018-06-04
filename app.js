/*Defines all our GET methods for handlebars. Has all the methods that handles
changes to our database*/

// module dependencies
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

//sqlite database
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('agenda.db');

//routes
const login = require('./routes/login');
const home = require('./routes/home');
const agenda = require('./routes/agenda');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', login.view);
app.get('/home', home.view);
app.get('/agenda', agenda.view);


app.get('/users', (req, res) => {
  db.all('SELECT * from users_to_agenda', (err,rows) => {
  console.log(rows);
  const allEvents = rows.map(e => '<h2>' + e.name + '</h2> '+ '<h4 style="margin-left: 20px">' + 'Location: ' + e.location + '</h4>' + '<br>');
  console.log(allEvents);
  res.send(allEvents);
  });
});

app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above

  db.all(
    'SELECT * FROM users_to_agenda WHERE name=$name',
    //parameters to pass into SQL
    {
      $name: nameToLookup,
    },
    //callback function to run when query finishes:
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0){
        res.send(rows[0]);
      } else {
        res.send({});
      }
    }
  );
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // hook up with your app
app.post('/users', (req, res) => {
  console.log(req.body);

  db.run(
    'INSERT INTO users_to_agenda VALUES ($name, $location)',
    // parameters to SQL query:
    {
      $name: req.body.name,
      $location: req.body.location,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send({message: 'error in app.post(/users)'});
      } else {
        res.send({message: 'successfully run app.post(/users)'});
      }
    }
  );
});

app.post('/users/Delete', (req, res) => {
  console.log(req.body);

  db.run(
    'DELETE FROM users_to_agenda WHERE name=$name',
    // parameters to SQL query:
    {
      $name: req.body.name,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send({message: 'error in app.post(/users)'});
      } else {
        res.send({message: 'successfully run app.post(/users)'});
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
