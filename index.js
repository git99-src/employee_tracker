const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "employee_db",
});
connection.connect((err) => {
  if (err) {
    throw err;
  }
  afterConnection();
});
function afterConnection() {
  // perform a select query and print the result in the console
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    connection.end();
  });
}

