// module dependencies
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

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

const fakeAgenda = {
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

app.get('/users', (req, res) => {
  const allStudents = Object.keys(fakeAgenda); // returns a list of object keys
  console.log('allStudents is:', allStudents);
  res.send(allStudents);
});

app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above
  const val = fakeAgenda[nameToLookup];
  console.log(nameToLookup, '->', val); // for debugging
  if (val) {
    res.send(val);
  } else {
    res.send({}); // failed, so return an empty object instead of undefined
  }
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
