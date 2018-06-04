const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('agenda.db');

db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users_to_agenda (name TEXT, location TEXT)");

  console.log('successfully created the users_to_agenda table in agenda.db');

  // print them out to confirm their contents:
  db.each("SELECT name, location FROM users_to_agenda", (err, row) => {
      console.log(row.name + ": " + row.location);
  });
});

db.close();
