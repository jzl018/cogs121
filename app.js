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
const nextEvent = require('./routes/nextEvent');
const agenda = require('./routes/agenda');
const temp = require('./routes/temp');

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
app.get('/temp', temp.view);

/*const fakeAgenda = {
  "michelle": {
    "classes":
      [
        {
          "courseName": "COGS 14B",
          "location": "PCYN 109",
        },
        {
          "courseName": "COGS 121",
          "location": "HSS 1330",
        },
        {
          "courseName": "CSE 100",
          "location": "WLH 2001",
        }
      ]
  },
  "kenneth": {
    "classes":
      [
        {
          "courseName": "COGS 121",
          "location": "HSS 1330",
        },
        {
          "courseName": "COGS 107C",
          "location": "PETER 108",
        },
        {
          "courseName": "COGS 101C",
          "location": "PETER 110",
        }
      ]
    }
};
*/

app.get('/users', (req, res) => {
  db.all('SELECT name from users_to_agenda', (err,rows) => {
  console.log(rows);
  const allStudents = rows.map(e => e.name);
  console.log(allStudents);
  res.send(allStudents);
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
app.post('/users/michelle', (req, res) => {
  console.log(req.body);

  db.run(
    'UPDATE users_to_agenda SET testcourse=$testcourse, testlocation=$testlocation',
    // parameters to SQL query:
    {
      $testcourse: req.body.testcourse,
      $testlocation: req.body.testlocation,
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
