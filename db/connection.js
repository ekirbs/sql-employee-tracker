// DEPENDENCIES
const mysql = require("mysql2");

// DATABASE CONNECTION
const connection = mysql.createConnection(
  {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "company_db"
  }
);
  
  connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to the company_db database.`)
});

module.exports = connection;
