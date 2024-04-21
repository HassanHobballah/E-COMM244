const mysql = require("mysql2")

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: "localhost", // or the IP address of your MySQL server
  port: "3306",
  user: "root", // your database username
  password: "root", // your database password
  database: "sqool",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// For use in Node.js async functions
const promisePool = pool.promise()

module.exports = promisePool
