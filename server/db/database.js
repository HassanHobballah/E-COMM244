const mysql = require("mysql2");

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: "localhost", // or the IP address of your MySQL server
  user: "your_username", // your database username
  password: "your_password", // your database password
  database: "your_database_name",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// For use in Node.js async functions
const promisePool = pool.promise();

module.exports = promisePool;
