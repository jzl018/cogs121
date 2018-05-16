const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('agenda.db');

db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users_to_agenda (name TEXT, coursename TEXT, location TEXT, coursename2 TEXT, location2 TEXT, coursename3 TEXT, location3 TEXT, testcourse TEXT, testlocation TEXT)");

  // insert 3 rows of data:
  db.run("INSERT INTO users_to_agenda VALUES ('Events', 'COGS 14B', 'PCYN 109', 'COGS 121', 'HSS 1330', 'CSE 100', 'WLH 2001', ' ', 'location1')");
  //db.run("INSERT INTO users_to_agenda VALUES ('kenneth', 'COGS 121', 'HSS 1330', 'COGS 107C', 'PETER 108', 'COGS 101C', 'PETER 110', 'course2', 'location2')");

  console.log('successfully created the users_to_agenda table in agenda.db');

  // print them out to confirm their contents:
  db.each("SELECT name, coursename, location FROM users_to_agenda", (err, row) => {
      console.log(row.name + ": " + row.coursename + ' - ' + row.location);
  });
});

db.close();
